// ----------------------
// - create user config -
// ----------------------

function createUserConfig(edit) {
	return new Promise(function(resolve, reject) {
		let fs = require('fs')
		let inquirer = require('inquirer')
		let colors = require("colors")
		let questionsUserconfig = require('./_questionsUserconfig')
		let filepath = 'userconfig.json'

		if (edit || !fs.existsSync(filepath)) {
			if (!edit) {
				console.log()
				console.log("Welcome to Indigestion!".bgRed.brightYellow)
				console.log("-----------------------".brightYellow)
				console.log("Before we get started we first need".brightYellow)
				console.log("to store your SMTP transport settings".brightYellow)
				console.log("for delivering messages.".brightYellow)
				console.log()
			} else {
				console.log()
				console.log("Editing your `userconfig.json` file".bgRed.brightYellow)
				console.log("-----------------------------------".brightYellow)
				console.log()
			}

			inquirer.prompt(questionsUserconfig())
				.then(function (answerAction) {
					let userconfig = {
						host: answerAction.newHost,
						port: answerAction.newPort,
						secure: answerAction.newSecure,
						user: answerAction.newUser,
						pass: answerAction.newPass
					}

					let data = JSON.stringify(userconfig, null, 4)
					// console.log('data',data)

					fs.writeFile(filepath, data, function (err) {
						resolve('finished writing userconfig file')
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
module.exports = createUserConfig
