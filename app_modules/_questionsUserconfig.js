// --------------------------------------
// - update "Userconfig.json" questions -
// --------------------------------------

let questionsUserconfig = function() {
	let fs = require('fs')
	var userconfig = {}

	if (fs.existsSync('userconfig.json')) {
		// refresh userconfig cache
		delete require.cache[require.resolve('../userconfig.json')]
		userconfig = require('../userconfig.json')
		// console.log("userconfig", userconfig)
	}

	let currentHost = userconfig.host ? userconfig.host : 'smtp.ethereal.email'
	let currentPort = userconfig.port ? userconfig.port : 587
	let currentSecure = userconfig.secure ? userconfig.secure : false
	let currentUser = userconfig.user ? userconfig.user : null
	let currentPass = userconfig.pass ? userconfig.pass : null

	let questionsArray = [
		{
			type: 'input',
			name: 'newHost',
			message: 'SMTP Host address:',
			default: currentHost
		},
		{
			type: 'number',
			name: 'newPort',
			message: 'Port:',
			default: currentPort
		},
		{
			type: 'confirm',
			name: 'newSecure',
			message: 'Secure - Yes for port 465, No for other ports:',
			default: currentSecure
		},
		{
			type: 'input',
			name: 'newUser',
			message: 'User:',
			default: currentUser
		},
		{
			type: 'password',
			name: 'newPass',
			message: 'Password:',
			mask: '*',
			default: currentPass
		},
	]

	return questionsArray
}



// *************
// ** Exports **
// *************
module.exports = questionsUserconfig
