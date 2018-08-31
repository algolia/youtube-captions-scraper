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

test('Extract passive income video', async t => {
  const subtitles = await getSubtitles({ videoID: 'JueUvj6X3DA' });
  t.deepEqual('creating passive income takes work but', subtitles[0].text);
});
