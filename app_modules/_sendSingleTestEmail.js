// --------------------------
// -- send all test emails --
// --------------------------
// jshint esversion: 8

var sendAllTestEmails = function(spinner){
	var config = require('../config.json')
	let nodemailer = require("nodemailer")

	// remove old config from cache
	delete require.cache[require.resolve('../userconfig.json')]
	// get new config
	var userconfig = require('../userconfig.json')
	

	async function sendItAll(logit) {
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

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Fred Foo 👻" <foo@example.com>', // sender address
			to: "bar@example.com, baz@example.com", // list of receivers
			subject: "Hello ✔", // Subject line
			text: "Hello world?", // plain text body
			html: "<b>Hello world?...</b>", // html body
		})

		if(logit) {
			console.log("Message sent: %s", info.messageId)
	
			if(userconfig.host === 'smtp.ethereal.email') {
				// Preview only available when sending through an Ethereal account
				console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
			}
		}
	}

	// spinner.start()
	// console.log("sending emails...".red)
	return new Promise(function(resolve) {
		spinner.start()
		console.log("sending emails...".red)
		sendItAll()
			.then(function(){
				console.log("emails sent ✔".brightYellow)
				spinner.stop()
				resolve()
			})
	})
	
	// spinner.stop()
}



// *************
// ** Exports **
// *************
module.exports = sendAllTestEmails
