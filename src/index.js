/* @flow */

import he from 'he';
import axios from 'axios';  // includes JSON transforms & XSRF protection

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
  const decodedData = decodeURIComponent(data)

  // * ensure we have access to captions data
  if (!decodedData.includes('captionTracks'))
    throw new Error(`Could not find captions for video: ${videoID}`)

  const regex = /({"captionTracks":.*isTranslatable":(true|false)}])/
  const [match] = regex.exec(decodedData)
  const { captionTracks } = JSON.parse(`${match}}`)
  const subtitle = captionTracks.find( ({ vssId }) => vssId && vssId.match(`.${lang}`) )

  // * ensure we have found the correct subtitle lang
  if (!subtitle || (subtitle && !subtitle.baseUrl))
    throw new Error(`Could not find ${lang} captions for ${videoID}`)

  const { data: transcript } = await axios.get(subtitle.baseUrl)

  let timedtext = []
  const startRegex = /start="([\d.]+)"/;
  const durRegex = /dur="([\d.]+)"/
  transcript
    .replace('<?xml version="1.0" encoding="utf-8" ?><transcript>', '')
    .replace(/&lt;font color=&quot;#......&quot;&gt;/gi, '')
    .replace(/&lt;\/font&gt;/gi, '')
    .replace(/&amp;/gi, '&')
    .replace('</transcript>', '')
    .split('</text>')
    .filter(line => line && line.trim())
    .map( (line, i) =>{
      let cue = {}
      const [, start] = startRegex.exec(line)
      cue.s = parseFloat(start)
      const [, dur] = durRegex.exec(line)
      cue.d = parseFloat(dur)
      const htmlText = line.replace(/<text.+>/, '')
      cue.t = he.decode(htmlText)
      timedtext[i] = cue
    })

  return {
    videoID,
    lang,
    datePull:  Date.now(),
    timedtext,
  }
}
