# Youtube Captions scraper

> Fetch youtube user submitted or fallback to auto-generated captions

## Installation

* `> npm install -S youtube-captions-scraper` OR
* `> yarn add youtube-captions-scraper`

## Usage

```js
// ES6 / TypeScript
import { getSubtitles } from 'youtube-captions-scraper';

getSubtitles({
  videoID: 'XXXXX', // youtube video id
  lang: 'fr' // default: `en`
}).then(captions => {
  console.log(captions);
});

// ES5
var getSubtitles = require('youtube-captions-scraper').getSubtitles;

getSubtitles({
  videoID: 'XXXXX', // youtube video id
  lang: 'fr' // default: `en`
}).then(function(captions) {
  console.log(captions);
});
```

Captions will be an array of object of this format:

```js
{
  "start": Number,
  "dur": Number,
  "text": String
}
```
