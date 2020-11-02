// --------------------------------------------
// - create/update an email ".json" questions -
// --------------------------------------------
// jshint esversion: 8

const { resolve } = require('path')

let questionsEmailFile = function(emailPath) {
	let fs = require('fs')
	let randomSentence = require('./_randomSentence.js')
	let randomString = require('./_randomString.js')
	let getAllAttachments = require("./_getAllAttachments")
	var emailFile = {}

	if (emailPath && fs.existsSync('./emails/' + emailPath + '.json')) {
		// refresh userconfig cache
		delete require.cache[require.resolve('../emails/' + emailPath + '.json')]
		emailFile = require('../emails/' + emailPath + '.json')
		// console.log("emailPath", emailPath)
		// console.log("emailFile", emailFile)
	}



	let currentFileName = emailPath ? emailPath : ('email-' + randomString(10))
	let currentFrom = emailFile.from ? emailFile.from : 'person@smarsh.com'
	let currentTo = emailFile.to ? emailFile.to : 'person2@smarsh.com, person3@smarsh.com'
	let currentCc = emailFile.cc ? emailFile.cc : null
	let currentBcc = emailFile.bcc ? emailFile.bcc : null
	let currentSubject = emailFile.subject ? emailFile.subject : randomSentence()
	let currentHtml = emailFile.html ? emailFile.html : randomSentence()
	let currentText = emailFile.text ? emailFile.text : null
	let theChoices = []
	getAllAttachments().then((allAttachmentsList)=>{
		for (const property in allAttachmentsList) {
			// console.log(`${property}: ${allAttachmentsList[property]}`);
			var theValue = `${allAttachmentsList[property]}`
			theValue = theValue.replace(/.\/attachments\//g,'')
			theChoices.push({value: theValue})
		}
	})

	let questionsArray = [
		{
			type: 'input',
			name: 'newFileName',
			message: 'email filename',
			default: currentFileName
		},
		{
			type: 'input',
			name: 'newFrom',
			message: 'from:',
			default: currentFrom
		},
		{
			type: 'input',
			name: 'newTo',
			message: 'to:',
			default: currentTo
		},
		{
			type: 'input',
			name: 'newCc',
			message: 'cc:',
			default: currentCc
		},
		{
			type: 'input',
			name: 'newBcc',
			message: 'bcc:',
			default: currentBcc
		},
		{
			type: 'input',
			name: 'newSubject',
			message: 'subject:',
			default: currentSubject
		},
		{
			type: 'editor',
			name: 'newHtml',
			message: 'html body:',
			default: currentHtml
		},
		{
			type: 'input',
			name: 'newText',
			message: 'text body [optional]:',
			default: currentText
		},
		{
			type: 'checkbox',
			name: 'newAttachments',
			message: 'select attachments:',
			choices: theChoices
		},
	]

	return questionsArray
}



// *************
// ** Exports **
// *************
module.exports = questionsEmailFile
