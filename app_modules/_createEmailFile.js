// ---------------------------
// - create email .json file -
// ---------------------------

function createEmailFile(edit) {
	return new Promise(function(resolve, reject) {
		let fs = require('fs')
		let inquirer = require('inquirer')
		let colors = require("colors")
		let questionsEmailFile = require('./_questionsEmailFile')
		let filepath = null

		if (1===1) {
		// if (edit || !fs.existsSync(filepath)) {
			if (!edit) {
				console.log()
				console.log("Creating New Email".bgRed.brightYellow)
				console.log("------------------".brightYellow)
				console.log()
			} else {
				console.log()
				console.log("Editing Existing Email".bgRed.brightYellow)
				console.log("----------------------".brightYellow)
				console.log()
			}

			inquirer.prompt(questionsEmailFile())
				.then(function (answerAction) {
					let newAttachments = []
					for (const property in answerAction.newAttachments) {
						// console.log(`${property}: ${answerAction.newAttachments[property]}`);
						var theValue = `${answerAction.newAttachments[property]}`
						theValue = ('./attachments/' + theValue)
						newAttachments.push({ path: theValue })
					}
					let emailFile = {
						from: answerAction.newFrom,
						to: answerAction.newTo,
						cc: answerAction.newCc,
						bcc: answerAction.newBcc,
						subject: answerAction.newSubject,
						text: answerAction.newText,
						html: answerAction.newHtml,
						attachments: newAttachments
					}

					let data = JSON.stringify(emailFile, null, 4)
					// console.log('data',data)

					filepath = './emails/' + (answerAction.newFileName ? answerAction.newFileName : 'some-email') + '.json'

					fs.writeFile(filepath, data, function (err) {
						// if (err) console.log(err)
						resolve('finished writing email file')
					})
				})
		} else {
			resolve()
		}
	})
}


// *************
// ** Exports **
// *************
module.exports = createEmailFile
