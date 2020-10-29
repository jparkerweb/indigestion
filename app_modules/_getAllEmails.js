// ------------------
// - get all emails -
// ------------------

var walk = require('walk')                     // file system walker (get file names)
var forEach = require('mout/array/forEach')    // foreach array util
var sort = require('mout/array/sort')          // sort array util
var unique = require('mout/array/unique')      // unique array util
var blank = require('./_blankLine')
var config = require('../config.json')

function getAllEmails(logit, includeBack) {
	if (typeof logit === 'undefined' ) { logit = false }

	var allEmailsList = []
	var baseDir = "./emails"
	var walker = walk.walk(baseDir, { followLinks: false })

	return new Promise(function(resolve, reject) {
		var currentBase = ''

		walker.on('file', function(root, stat, next) {
			var currentFile = stat.name
			var currentDir = root

			// add to list if the file is json ("*.json")
			if(currentFile.substr(-4) === 'json') {
				currentDir = (currentDir.replace(baseDir + '\\', ''))
				allEmailsList.push(currentDir.replace(/\\/g,'/') + '/' + currentFile)
			}

			next()
		})

		walker.on('end', function() {
			allEmailsList = unique(allEmailsList)
			allEmailsList = sort(allEmailsList)

			if (logit) {
				if (allEmailsList.length > 0) {
					blank()
					console.log((' -------------- ').bgGreen.black)
					console.log((' - Email List - ').bgGreen.black)
					console.log((' -------------- ').bgGreen.black)
					console.log('')

					forEach(allEmailsList, function(val) {
						var displayVal = ' ' + val + ' '
						console.log(displayVal.brightYellow)
					})

					blank()
				} else {
					blank()
					console.log(('!!! No Emails Exist !!!').bgRed.brightYellow)
				}
			} else {
				if (includeBack) allEmailsList.push('<<-- Back --')
			}

			resolve(allEmailsList)
		})
	})
}


// *************
// ** Exports **
// *************
module.exports = getAllEmails
