// build first with `yearn build` or `npx build`, then run with `node dist-demo`
const getSubtitles = require('./dist').getSubtitles;

getSubtitles({
    videoID: '9W0Dy1nM-zU',
    lang: 'en' // default: `en`
}).then(captions => {
    console.log(captions);
});

/*
You should see this:

[ { start: '11.5', dur: '4', text: '<b>Bold</b>' },
  { start: '11.5', dur: '4', text: '<i>Italic</i>' },
  { start: '11.5', dur: '4', text: '<u>Underline</u>' },
  { start: '11.5',
    dur: '4',
    text: '<b>Bold </b><i>Italic </i><u>Underline</u>' },
  { start: '15.5', dur: '4', text: 'Red (a = 40)' },
  { start: '15.5', dur: '4', text: 'Green (a = 127)' },
  { start: '15.5', dur: '4', text: 'Blue (a = 255)' },
  { start: '15.5', dur: '4', text: 'Red Green Blue' },
  { start: '19.5', dur: '4', text: 'Red (a = 40)' },
  { start: '19.5', dur: '4', text: 'Green (a = 127)' },
  { start: '19.5', dur: '4', text: 'Blue (a = 255)' },
  { start: '19.5', dur: '4', text: 'Opaque' },
  { start: '19.5', dur: '4', text: 'Red Green Blue' },
  { start: '23.5', dur: '4', text: 'Edge type 1' },
  { start: '23.5', dur: '4', text: 'Edge type 2' },
  { start: '23.5', dur: '4', text: 'Edge type 3' },
  { start: '23.5', dur: '4', text: 'Edge type 4' },
  { start: '23.5', dur: '4', text: 'One Two Three Four' },
  { start: '27.5', dur: '6', text: 'Font 0' },
  { start: '27.5', dur: '6', text: 'Font 1' },
  { start: '27.5', dur: '6', text: 'Font 2' },
  { start: '27.5', dur: '6', text: 'Font 3' },
  { start: '27.5', dur: '6', text: 'Font 4' },
  { start: '27.5', dur: '6', text: 'Font 5' },
  { start: '27.5', dur: '6', text: 'Font 6' },
  { start: '27.5', dur: '6', text: 'Font 7' },
  { start: '33.5',
    dur: '4',
    text: 'Zero One Two Three Four Five Six Seven' },
  { start: '37.5', dur: '4', text: '30%' },
  { start: '37.5', dur: '4', text: '100%' },
  { start: '37.5', dur: '4', text: '300%' },
  { start: '37.5', dur: '4', text: '30% 100% 300%' },
  { start: '41.5', dur: '4', text: 'Top left' },
  { start: '41.5', dur: '4', text: 'Top center' },
  { start: '41.5', dur: '4', text: 'Top right' },
  { start: '41.5', dur: '4', text: 'Middle left' },
  { start: '41.5', dur: '4', text: 'Middle center' },
  { start: '41.5', dur: '4', text: 'Middle right' },
  { start: '41.5', dur: '4', text: 'Bottom left' },
  { start: '41.5', dur: '4', text: 'Bottom center' },
  { start: '41.5', dur: '4', text: 'Bottom right' },
  { start: '45.5', dur: '4', text: 'Left-\naligned line' },
  { start: '45.5', dur: '4', text: 'Centered\nline' },
  { start: '45.5', dur: '4', text: 'Right-\naligned line' },
  { start: '49.5', dur: '4', text: 'Karaoke' },
  { start: '53.5', dur: '2', text: 'Line break\nat start of span' },
  { start: '53.5',
    dur: '2',
    text: 'Line break\nin middle of span' },
  { start: '53.5', dur: '2', text: 'Line break\nat end of span' } ]

other youtube video ids:
ziGD7vQOwl8 yjhANyrKpv8 TomOQYxFnrU nm_xCuQ5Szw rmeMDahEi1Q Je8FjYtYDf0 w82a1FT5o88 mrX2eH_FL4E FlTG0UXRAkE fn-Qb-YQqo4 t6bbuDUPIgk t6bbuDUPIgk yUx_HI8D-4w 
*/
