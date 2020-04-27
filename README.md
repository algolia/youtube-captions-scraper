# Youtube Captions scraper

> Fetch youtube user submitted or fallback to auto-generated captions

## Installation

* `npm install -S youtube-captions-scraper` OR
* `yarn add youtube-captions-scraper`

## Usage

```js
// ES6 / TypeScript
import { getSubtitles } from 'youtube-captions-scraper'

getSubtitles({
  videoID: 'XXXXX', // youtube video id
  lang: 'fr' // default: `en`
}).then(captions => {
  console.log(captions)
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

### Output

**v2 change**: Captions will be an array of object of this format:

```js
"videoID": "9W0Dy1nM-zU",
"lang": "en",
"datePull": 1587948820739,
"timedtext": [
  {
    "s": 11.5,
    "d": 4,
    "t": "<b>Bold</b>"
  },
etc...
```
Key:
 * videoID = YouTube's unique id after `v=` in URL querry string
 * lang = language code of captions
 * datePull = [seconds stamp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) when the captions was pulled & processed
 * timedtext array = **s**tart time, **d**uration, & **t**ext


### CLI

```bash
node cli VIDEO-ID
```
Outputs in home dir as `VIDEO-ID.captions.json`.  
The `.gitignore` prevents you from saving the output in your git repo.
