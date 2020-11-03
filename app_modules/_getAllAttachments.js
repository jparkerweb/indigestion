// -----------------------
// - get all attachments -
// -----------------------

var walk = require('walk')                     // file system walker (get file names)
var forEach = require('mout/array/forEach')    // foreach array util
var sort = require('mout/array/sort')          // sort array util
var unique = require('mout/array/unique')      // unique array util
var blank = require('./_blankLine')

function getAllAttachments(logit) {
	if (typeof logit === 'undefined' ) { logit = false }

	var allAttachmentsList = []
	var baseDir = "./attachments"
	var walker = walk.walk(baseDir, { followLinks: false })

	return new Promise(function(resolve, reject) {
		var currentBase = ''

		walker.on('file', function(root, stat, next) {
			var currentFile = stat.name
			var currentDir = root

			currentDir = (currentDir.replace(baseDir + '\\', ''))
			allAttachmentsList.push(currentDir.replace(/\\/g,'/') + '/' + currentFile)

			next()
		})

		walker.on('end', function() {
			allAttachmentsList = unique(allAttachmentsList)
			allAttachmentsList = sort(allAttachmentsList)

			if (logit) {
				if (allAttachmentsList.length > 0) {
					blank()
					console.log((' -------------------- ').bgGreen.black)
					console.log((' - Attachments List - ').bgGreen.black)
					console.log((' -------------------- ').bgGreen.black)
					console.log('')

					forEach(allAttachmentsList, function(val) {
						var displayVal = ' ' + val + ' '
						console.log(displayVal.brightYellow)
					})

					blank()
				} else {
					blank()
					console.log(('!!! No Attachments Exist !!!').bgRed.brightYellow)
				}
			}

			resolve(allAttachmentsList)
		})
	})
}


// *************
// ** Exports **
// *************
module.exports = getAllAttachments
