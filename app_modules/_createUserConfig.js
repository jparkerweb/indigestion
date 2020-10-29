// ----------------------
// - create user config -
// ----------------------

var fs = require('fs')


function createUserConfig() {
	return new Promise(function(resolve, reject) {
		var filepath = 'userconfig.json'

		if (!fs.existsSync(filepath)) {
			console.log('creating userconfig.json....'.red)

			let defaultSMTPHost = 'smtp.ethereal.email'
			let defaultSMTPPort = 587
			let defaultSMTPSecure = false
			let defaultSMTPUser = ''
			let defaultSMTPPass = ''
			let userconfig = {
				host: defaultSMTPHost,
				port: defaultSMTPPort,
				secure: defaultSMTPSecure,
				user: defaultSMTPUser,
				pass: defaultSMTPPass
			}
			let data = JSON.stringify(userconfig, null, 4)
			// console.log('data',data)

			fs.writeFile(filepath, data, function (err) {
				resolve('created')
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
