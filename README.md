# Youtube Captions Scrapper

> Scrap youtube user defined and auto-generated captions

## Installation

* `> npm install -S youtube-captions-scrapper` OR
* `> yarn add youtube-captions-scrapper`

## Usage

```js
// ES6 / TypeScript
import { getSubtitles } from 'youtube-captions-scrapper';

getSubtitles({
  videoID: 'XXXXX', // youtube video id
  lang: 'fr' // default: `en`
}).then(captions => {
  console.log(captions);
});

// ES5
var getSubtitles = require('youtube-captions-scrapper').getSubtitles;

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
