const getSubtitles = require('./dist').getSubtitles
// import ytttjs from "./index.mjs"
// const getSubtitles = require('./dist').getSubtitles
const fs = require('fs')
// import path from 'path'
let arg = process.argv[2] // should include path
console.log(arg)

if (!arg) throw "Needs input data!"
switch (arg){

	case '-h':
	case '--help':
		console.log(`First arg: YouTube video ID number
Output will be 'ARG.captions.json'
`)
		break

	default:
		console.log(`Attempting to grab captions for `+ arg)

		let res = {}
		getSubtitles({
			videoID: arg,
			lang: 'en' // default: `en`
		}).then(captions => {
			res = captions
			console.log(res)

			const outputPath = __dirname +'/'+ arg +'.captions.json'
			console.log(`saving to: `+ outputPath)
			fs.writeFileSync(outputPath, JSON.stringify(res))
		})
}
