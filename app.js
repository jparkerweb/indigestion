#!/usr/bin/env node

// ****************************************************
// ** indigestion is a GUI for running TAPTAP Tests  **
// ****************************************************
// jshint esversion: 8

const args = require('args')
var colors = require("colors")                 // pretty console colors
var inquirer = require('inquirer')             // prompt questions and gather answers
var Spinner = require('cli-spinner').Spinner   // cool console spinner (progress indicator)
var nodeCleanup = require('node-cleanup')

var pressEnterToContinue = require('./app_modules/_pressEnterToContinue')
var cls = require('./app_modules/_clearConsole')
var blank = require('./app_modules/_blankLine')
var asciiLogo = require('./app_modules/_asciiLogo')
var sendAllTestEmails = require('./app_modules/_sendAllTestEmails')
var createEmailFile = require('./app_modules/_createEmailFile')
var deleteEmailFile = require('./app_modules/_deleteEmailFile')
var createUserConfig = require('./app_modules/_createUserConfig')
const { resolveContent } = require("nodemailer/lib/shared")


// --------------
// - setup args -
// --------------
args
	.option('email', 'send all email', ['e'])

	const flags = args.parse(process.argv)


// -----------------
// - setup spinner -
// -----------------
var spinner = new Spinner(' ')
spinner.setSpinnerString(25)

// -------------------------------------------------
// - indigestion - when you need test data rot-gut -
// -------------------------------------------------
function indigestion(msg) {
	cls()
	asciiLogo()

	if (typeof msg === 'undefined' ) { msg = '' }
	console.log((msg).bgWhite.black)
	var questionsTestType = require('./app_modules/_questionsTestType')

	inquirer.prompt(questionsTestType).then(function (answerAction) {
		if (answerAction.testType !== '') {

			switch(answerAction.testType) {
					case 'send-all-test-emails':
						// console.log(answerAction.testType)
						sendAllTestEmails(spinner)
							.then(function(){
								pressEnterToContinue('press enter to continue...', indigestion)
							})

						break

					case 'create-new-email':
						// console.log(answerAction.testType)
						createEmailFile(false)
							.then(function() {
								console.log("")
								console.log("new ".red + "email".brightYellow + " created".red)
								console.log("")
								setTimeout(() => {
									pressEnterToContinue('', indigestion(''))
								}, 1000);
							})

						break

					case 'delete-email':
						// console.log(answerAction.testType)
						deleteEmailFile(false)
							.then(function(msg) {
								console.log("")
								console.log(msg + "".brightYellow)
								console.log("")
								setTimeout(() => {
									pressEnterToContinue('press enter to continue...', indigestion)
								}, 1000);
							})

						break

					case 'update-userconfig':
						// console.log(answerAction.testType)
						createUserConfig(true)
							.then(function() {
								console.log("")
								console.log("`".red + "userconfig.json".brightYellow + "` was updated".red)
								console.log("")
								pressEnterToContinue('press enter to continue...', indigestion)
							})
							
							break
							
					default:
						console.log("action noy yet available: ", answerAction.testType)
						spinner.stop()
						pressEnterToContinue('press enter to continue...', indigestion)
			} //\ end switch
		} else {
			cls()
			asciiLogo()

			console.log('\nThanks for using '.brightYellow + 'Indigestion'.red)
			console.log('May all your tests pass!\n'.brightYellow)
			return ''
		}
	})
}


nodeCleanup()

if (flags.email[0] === true) {
	sendAllTestEmails()
} else {
	createUserConfig()
		.then(function(msg) {
			cls()
			if(msg) {
				console.log("")
				console.log("a `".red + "userconfig.json".brightYellow + "` file was created in the root of this project".red)
				console.log("")
				pressEnterToContinue('"Press enter to continue...', indigestion)
			} else {
				indigestion()
			}
		})
}
