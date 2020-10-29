// --------------------------
// -- send all test emails --
// --------------------------
// jshint esversion: 8

var sendAllTestEmails = function(spinner){
	const fs = require('fs')
	let getAllEmails = require("./_getAllEmails")
	let nodemailer = require("nodemailer")
	let cliProgress = require('cli-progress')
	const _colors = require('colors')

	// remove old config from cache
	delete require.cache[require.resolve('../userconfig.json')]
	// get new config
	var userconfig = require('../userconfig.json')
	
	async function getTheEmails() {
		return await getAllEmails(false)
	}

	async function sendItAll(logit, emailsList) {
		if (logit) console.log("emailsList:", emailsList)
		if (emailsList.length < 1) {
			console.log("")
			console.log("can not find any emails in the 'emails' folder".red)
			console.log("")
			return false
		}

		// create new progress bar
		const bar = new cliProgress.SingleBar({
			format: 'Email Send Progress |' + _colors.red('{bar}') + '| {percentage}% || {value}/{total} Emails',
			barCompleteChar: '\u2588',
			barIncompleteChar: '\u2591',
			hideCursor: true
		})

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: userconfig.host,
			port: userconfig.port,
			secure: userconfig.secure, // true for 465, false for other ports
			auth: {
				user: userconfig.user,
				pass: userconfig.pass,
			}
		})

		var numEmails = emailsList.length
		bar.start(numEmails, 0, {
			speed: "N/A"
		})

		
		for (i = 0; i < numEmails; i++) {
			let rawdata = fs.readFileSync(emailsList[i])
			let emailData = JSON.parse(rawdata)
			let emailFrom = emailData.from ? emailData.from : null
			let emailTo = emailData.to ? emailData.to : null
			let emailCc = emailData.cc ? emailData.cc : null
			let emailBcc = emailData.bcc ? emailData.bcc : null
			let emailSubject = emailData.subject ? emailData.subject : null
			let emailText = emailData.text ? emailData.text : null
			let emailHTML = emailData.html ? emailData.html : null
			let emailAttachments = emailData.attachments ? emailData.attachments : null
			if (logit) console.log("emailData", emailData)

			// send mail with defined transport object
			let info = await transporter.sendMail({
				from: emailFrom,
				to: emailTo,
				cc: emailCc,
				bcc: emailBcc,
				subject: emailSubject,
				text: emailText,
				html: emailHTML,
				attachments: emailAttachments,
			})

			bar.increment()

			if (logit) {
				console.log("Message sent: %s", info.messageId)
		
				if (userconfig.host === 'smtp.ethereal.email') {
					// Preview only available when sending through an Ethereal account
					console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
				}
			}
		}

		bar.stop()
		console.log("emails sent ✔".brightYellow)
	}

	return new Promise(function(resolve, reject) {
		if (userconfig.user === "" || userconfig.pass === "") {
			console.log("")
			console.log("ERROR: please configure your \"".red + "userconfig.json".brightYellow + "\" file and try again".red)
			console.log("")
			resolve()
		} else {
			getTheEmails().then(function(emailsList){
				console.log("")
				console.log("sending emails...".red)

				sendItAll(false, emailsList)
					.then(function(){
						console.log("")
						resolve()
					})
					.catch((error) => {
						console.log(error)
						console.log("")
						console.log("check your \"".red + "userconfig.json".brightYellow + "\" file and try again".red)
						console.log("")
					})
			})
		}
	})
}



// *************
// ** Exports **
// *************
module.exports = sendAllTestEmails
