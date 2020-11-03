// -------------------------------
// - delete selected email files -
// -------------------------------
// jshint esversion: 8

function deleteEmailFile() {
	return new Promise(function(resolve, reject) {
		let fs = require('fs')
		let inquirer = require('inquirer')
		let colors = require("colors")
		let getAllEmails = require('./_getAllEmails')
		let filepath = null

		getAllEmails(false, false).then((emailList) => {
			// console.log("emailList", emailList)

			let emailsForSelection = []
			for (const property in emailList) {
				// console.log(`${property}: ${emailList[property]}`);
				var theEmailName = `${emailList[property]}`
				theEmailName = theEmailName.replace(/.\/emails\//g,'')
				emailsForSelection.push({value: theEmailName})
			}

			let questionsArray = [
				{
					type: 'checkbox',
					name: 'selectedEmails',
					message: 'select emails for deletion:',
					choices: emailsForSelection
				},
				{
					type: 'confirm',
					name: 'deleteEmails',
					message: 'are you sure you want to delete the selected emails?'
				},
			]
			
			inquirer.prompt(questionsArray).then(function (answerAction) {
				if (answerAction.deleteEmails) {
					for (const element of answerAction.selectedEmails) {
						const path = ('./emails/' + element)

						try {
							fs.unlinkSync(path)
							console.log('deleted "'.red + path.brightYellow + '"'.red)
						} catch(err) {
							console.error(err)
						}
					}
					resolve('')
				} else {
					resolve('emails not deleted')
				}
				// console.log("answerAction", answerAction)
			})
		})
	})
}


// *************
// ** Exports **
// *************
module.exports = deleteEmailFile
