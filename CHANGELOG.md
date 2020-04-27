# v2.0.0

* BREAKING CHANGE: output includes videoID, language code, & datetime stamp of when script was ran
* BREAKING CHANGE: timeed text output has shortend key names for **s**tart, **d**uration, & **t**ext to save a few k.
* added CLI script: `node cli VIDEO-ID` to run, outputs in home dir as `VIDEO-ID.captions.json`.
* dropped lodash
* updated axios


# v1.1.0

* leave most HTML tags except `<font>` which is usally spammy.


# v1.0.1

* strip HTML tags from captions
