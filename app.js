// **********************************************
// ** indigestion is a GUI for running TAPTAP Tests  **
// **********************************************
// jshint esversion: 6

var colors = require("colors")                 // pretty console colors
var inquirer = require('inquirer')             // prompt questions and gather answers
var Spinner = require('cli-spinner').Spinner   // cool console spinner (progress indicator)
var nodeCleanup = require('node-cleanup')

var pressEnterToContinue = require('./app_modules/_pressEnterToContinue')
var sendAllTestEmails = require('./app_modules/_sendAllTestEmails')
var cls = require('./app_modules/_clearConsole')
var blank = require('./app_modules/_blankLine')
var asciiLogo = require('./app_modules/_asciiLogo')
var createUserConfig = require('./app_modules/_createUserConfig')


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

					default:
						console.log("some other action: ", answerAction.testType)
						spinner.stop()
			} //\ end switch
		} else {
			cls()
			asciiLogo()

			console.log('\nThanks for using '.brightYellow + 'Indigestion'.red)
			console.log('May all your tests pass!\n'.brightYellow)
		}
	})
}

nodeCleanup()
createUserConfig()
	.then(function(msg) {
		cls()
		if(msg) {
			console.log("")
			console.log("a `".red + "userconfig.json".brightYellow + "` file was created in the root of this project".red)
			console.log("please edit its configuration values before continuing".red)
			console.log("")
			pressEnterToContinue('"Press enter to continue...', indigestion)
		} else {
			indigestion()
		}
	})
