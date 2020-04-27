import test from 'ava';
import { getSubtitles } from '../src';

test('Extract estonia war subtitles', async t => {
  const subtitles = await getSubtitles({ videoID: 'HBA0xDHZjko' });
  t.deepEqual(subtitles[0], {
    dur: '5.87',
    start: '6.62',
    text: 'November 19',
  });
});

test('Simple HTML stays, but <font> is removed', async t => {
  const subtitles = await getSubtitles({ videoID: '9W0Dy1nM-zU' });
  t.deepEqual('<b>Bold </b><i>Italic </i><u>Underline</u>', subtitles[3].text);
  t.deepEqual('Red (a = 40)', subtitles[4].text);
});
