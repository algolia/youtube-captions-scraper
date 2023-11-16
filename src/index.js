/* @flow */

import he from 'he';
import axios from 'axios';
import { find } from 'lodash';
import striptags from 'striptags';

function isRunningInExtension() {
  // * extension API check
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
    return true;
  }
  if (typeof browser !== 'undefined' && browser.runtime && browser.runtime.id) {
    return true;
  }

  // ? Safari, Firefox checks might go here

  return false;
}

async function fetchData(url) {
  if (isRunningInExtension()) {
    const response = await fetch(url);
    return await response.text();
  } else {
    const { data } = await axios.get(url);
    return data;
  }
}

export async function getSubtitles({
  videoID,
  lang = 'en',
}: {
  videoID: string,
  lang: 'en' | 'de' | 'fr' | void,
}) {
  const data = await fetchData(
    `https://youtube.com/watch?v=${videoID}`
  );

  // * ensure we have access to captions data
  if (!data.includes('captionTracks'))
    throw new Error(`Could not find captions for video: ${videoID}`);

  const regex =  /"captionTracks":(\[.*?\])/;
  const [match] = regex.exec(data);

  const { captionTracks } = JSON.parse(`{${match}}`);
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
