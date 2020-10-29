// **********************************************
// ** indigestion is a GUI for running TAPTAP Tests  **
// **********************************************
// jshint esversion: 6

var colors = require("colors")                 // pretty console colors
var inquirer = require('inquirer')             // prompt questions and gather answers
var Spinner = require('cli-spinner').Spinner   // cool console spinner (progress indicator)
var nodeCleanup = require('node-cleanup')

var pressEnterToContinue = require('./app_modules/_pressEnterToContinue')
var setEnvironment = require('./app_modules/_setEnvironment')
var setNumThreads = require('./app_modules/_setNumThreads')
var sendAllTestEmails = require('./app_modules/_sendAllTestEmails')
var checkForExistingReports = require('./app_modules/_checkForExistingReports')
var openExistingReport = require('./app_modules/_openExistingReport')
var deleteReport = require('./app_modules/_deleteReport')
var deleteAllReports = require('./app_modules/_deleteAllReports')
var checkForSingleTests = require('./app_modules/_checkForSingleTests')
var checkForTestGroups = require('./app_modules/_checkForTestGroups')
var runSingleTest = require('./app_modules/_runSingleTest')
var runTestGroup = require('./app_modules/_runTestGroup')
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
					case 'list-reports':
						// console.log(answerAction.testType)
						checkForExistingReports(true)
							.then(function(reportList){
								pressEnterToContinue('press enter to continue...', indigestion)
							})

						break

					case 'open-report':
						// console.log(answerAction.testType)
						checkForExistingReports(false).then(function(reportList){
							if (reportList.length > 0) {
								// console.log("reportList", reportList)
								cls()
								asciiLogo()
								blank()

								openExistingReport(reportList, spinner)
									.then(function(message) {
										blank()
										pressEnterToContinue(message + '"Press enter to continue...', indigestion)
									})
							} else {
								cls()
								asciiLogo()
								blank()
								console.log(('Please run a Test before attempting to open a Report.').bgRed.white)
								blank()

								pressEnterToContinue('press enter to continue...', indigestion)
							}
						})

						break

					case 'delete-a-report':
						// console.log(answerAction.testType)
						checkForExistingReports(false).then(function(reportList){
							if (reportList.length > 0) {
								// console.log("reportList", reportList)
								cls()
								asciiLogo()
								blank()

								deleteReport(reportList)
									.then(function(message) {
										blank()
										pressEnterToContinue(message + '"Press enter to continue...', indigestion)
									})
							} else {
								cls()
								asciiLogo()
								blank()
								console.log(('Please run a Test before attempting to delete a Report.').bgRed.white)
								blank()

								pressEnterToContinue('press enter to continue...', indigestion)
							}
						})

						break

					case 'delete-all-reports':
						// console.log(answerAction.testType)
						checkForExistingReports(false).then(function(reportList){
							if (reportList.length > 0) {
								// console.log("reportList", reportList)
								cls()
								asciiLogo()
								blank()

								deleteAllReports()
									.then(function(message) {
										blank()
										pressEnterToContinue(message + '"Press enter to continue...', indigestion)
									})
							} else {
								cls()
								asciiLogo()
								blank()
								console.log(('Please run a Test before attempting to delete all Reports.').bgRed.white)
								blank()

								pressEnterToContinue('press enter to continue...', indigestion)
							}
						})

						break

					case 'set-environment':
						console.log(answerAction.testType)
						setEnvironment()
							.then(function(message) {
								pressEnterToContinue(message + 'press enter to continue...', indigestion)
							})

						break
					case 'set-num-threads':
						console.log(answerAction.testType)
						setNumThreads()
							.then(function(message) {
								pressEnterToContinue(message + 'press enter to continue...', indigestion)
							})

						break
					case 'list-single-tests':
						// console.log(answerAction.testType)
						checkForSingleTests(true)
							.then(function(singleTestList){
								pressEnterToContinue('press enter to continue...', indigestion)
							})

						break

					case 'run-single-test':
					case 'run-single-test-tree':
					case 'debug-mode':
						// console.log(answerAction.testType)
						checkForSingleTests(false).then(function(singleTestList){
							if (singleTestList.length > 0) {
								var generateOnly = (answerAction.testType === 'debug-mode') || false
								var isTreeMode = (answerAction.testType === 'run-single-test-tree' ? true : false)
								runSingleTest(singleTestList, spinner, generateOnly, isTreeMode)
									.then(function(message) {
										pressEnterToContinue(message + '"Press enter to continue...', indigestion)
									})
							} else {
								blank()
								console.log(('No Tests found.').bgRed.white)
								blank()

								pressEnterToContinue('press enter to continue...', indigestion)
							}
						})

						break

					case 'list-test-groups':
						// console.log(answerAction.testType)
						checkForTestGroups(true)
							.then(function(testGroupList){
								pressEnterToContinue('press enter to continue...', indigestion)
							})

						break

					case 'run-test-group':
					case 'run-test-group-tree':
						// console.log(answerAction.testType)
						checkForTestGroups(false).then(function(testGroupList){
							if (testGroupList.length > 0) {
								var isTreeMode = (answerAction.testType === 'run-test-group-tree' ? true : false)
								console.log("isTreeMode", isTreeMode)
								runTestGroup(testGroupList, spinner, isTreeMode)
									.then(function(message) {
										pressEnterToContinue(message + '"Press enter to continue...', indigestion)
									})
							} else {
								blank()
								console.log(('No Tests found.').bgRed.white)
								blank()

								pressEnterToContinue('press enter to continue...', indigestion)
							}
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
