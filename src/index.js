/* @flow */

import he from 'he';
import axios from 'axios';
import { find } from 'lodash';
import striptags from 'striptags';
import parser from 'xml2json'

export async function getSubtitles({
  videoID,
  lang = 'en',
}: {
  videoID: string,
  lang: 'en' | 'de' | 'fr' | void,
}) {
  const { data } = await axios.get(
    `https://youtube.com/get_video_info?video_id=${videoID}`
  );

  const decodedData = decodeURIComponent(data);

  // * ensure we have access to captions data
  if (!decodedData.includes('captionTracks')) {
    const availableCaptions = await axios.get(`http://video.google.com/timedtext?v=${videoID}&type=list`)
    const availableCaptionsParsed = parser.toJson(availableCaptions.data, {object: true})
    let availableLanguages = []
    try {
      availableCaptionsParsed.transcript_list.track.forEach(track => availableLanguages.push(track.lang_code))
    } catch (error) {
      throw new Error(`Could not find captions for video: ${videoID}`);
    }
    if (!availableLanguages.includes(lang)) {
      throw new Error(`Could not find ${lang} captions. Avaliable languages: ${availableLanguages.join(', ')}.`);
    }
    const captionsForLang = await axios.get(`http://video.google.com/timedtext?v=${videoID}&lang=${lang}`)
    const captionsForLangParsed = parser.toJson(captionsForLang.data, {object: true})
    let result = []
    try {
      result = captionsForLangParsed.transcript.text.map(({$t, ...caption}) => ({...caption, text: $t}))
    } catch (error) {
      throw new Error(`Could not find captions for video: ${videoID}`);
    }
    return result
  }

  const regex = /({"captionTracks":.*isTranslatable":(true|false)}])/;
  const [match] = regex.exec(decodedData);
  const { captionTracks } = JSON.parse(`${match}}`);

  const subtitle =
    find(captionTracks, {
      vssId: `.${lang}`,
    }) ||
    find(captionTracks, {
      vssId: `a.${lang}`,
    }) ||
    find(captionTracks, ({ vssId }) => vssId && vssId.match(`.${lang}`));

  // * ensure we have found the correct subtitle lang
  if (!subtitle || (subtitle && !subtitle.baseUrl))
    throw new Error(`Could not find ${lang} captions for ${videoID}`);

  const { data: transcript } = await axios.get(subtitle.baseUrl);
  const lines = transcript
    .replace('<?xml version="1.0" encoding="utf-8" ?><transcript>', '')
    .replace('</transcript>', '')
    .split('</text>')
    .filter(line => line && line.trim())
    .map(line => {
      const startRegex = /start="([\d.]+)"/;
      const durRegex = /dur="([\d.]+)"/;

      const [, start] = startRegex.exec(line);
      const [, dur] = durRegex.exec(line);

      const htmlText = line
        .replace(/<text.+>/, '')
        .replace(/&amp;/gi, '&')
        .replace(/<\/?[^>]+(>|$)/g, '');

      const decodedText = he.decode(htmlText);
      const text = striptags(decodedText);

      return {
        start,
        dur,
        text,
      };
    });

  return lines;
}
