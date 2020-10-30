// --------------------------------------
// - update "Userconfig.json" questions -
// --------------------------------------

let questionsUserconfig = function() {
	let fs = require('fs')
	var userconfig = {}

	if (fs.existsSync('userconfig.json')) {
		console.log("userconfig EXISTS!!!!!!!!!".bgYellow.black)
		// refresh userconfig cache
		delete require.cache[require.resolve('../userconfig.json')]
		userconfig = require('../userconfig.json')
		// console.log("userconfig", userconfig)
	} else {
		console.log("userconfig DOES NOT EXIST!!!!!!!!!".bgYellow.black)
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
			message: '\nSMTP Host address:\n',
			default: currentHost
		},
		{
			type: 'number',
			name: 'newPort',
			message: '\nPort:\n',
			default: currentPort
		},
		{
			type: 'confirm',
			name: 'newSecure',
			message: '\nSecure (Yes for port 465, No for other ports):\n',
			default: currentSecure
		},
		{
			type: 'input',
			name: 'newUser',
			message: '\nUser:\n',
			default: currentUser
		},
		{
			type: 'input',
			name: 'newPass',
			message: '\nPassword:\n',
			default: currentPass
		},
	]

	return questionsArray
}



// *************
// ** Exports **
// *************
module.exports = questionsUserconfig
