var pjson = require('../package.json')

var asciiLogo = function() {
	// remove old userconfig from cache
	delete require.cache[require.resolve('../userconfig.json')]
	// get new userconfig
	var userconfig = require('../userconfig.json')



	console.log("    (                                                           ".bgRed.brightYellow + "-".bgRed.yellow)
	console.log("    )\\ )         (                            )                 ".bgRed.brightYellow + "-".bgRed.yellow)
	console.log("   (()/(         )\\ )  (   (  (     (      ( /( (               ".bgRed.brightYellow + "-".bgRed.yellow)
	console.log("    /( )) (     (()/(  )\\  )\\))(   ))\\ (   )\\()))\\   (    (     ".bgRed.brightYellow + "-".bgRed.yellow)
	console.log("   (".bgRed.brightYellow + "_".bgRed.black + "))   )\\ )   ((".bgRed.brightYellow + "_".bgRed.black + "))((".bgRed.brightYellow + " ".bgRed.brightYellow + ")((".bgRed.brightYellow + " ".bgRed.brightYellow + "))\\  /((".bgRed.brightYellow + " ".bgRed.brightYellow + "))\\ (".bgRed.brightYellow + "_".bgRed.black + "))/((".bgRed.brightYellow + " ".bgRed.brightYellow + ")  )\\   )\\ )".bgRed.brightYellow + "  -".bgRed.yellow)
	console.log("   |_ _| _".bgRed.black + "(".bgRed.brightYellow + "_".bgRed.black + "/(".bgRed.brightYellow + "   _| |  ".bgRed.black + "(".bgRed.brightYellow + "_".bgRed.black +") (()(".bgRed.brightYellow + "_".bgRed.black + ")(".bgRed.brightYellow + "_".bgRed.black + ")) ((".bgRed.brightYellow + "_".bgRed.black + ")".bgRed.brightYellow + "| |_  ".bgRed.black + "(".bgRed.brightYellow + "_".bgRed.black + ") ((".bgRed.brightYellow + "_".bgRed.black + ") ".bgRed.brightYellow + "_".bgRed.black + "(".bgRed.brightYellow + "_".bgRed.black + "/(".bgRed.brightYellow + "  -".bgRed.yellow)
	console.log("    | | | ' \\".bgRed.black + ")".bgRed.brightYellow + " / _` |  | |/ _` | / -_)(_-<|  _| | |/ _ \\| ' \\".bgRed.black + "))".bgRed.brightYellow + " -".bgRed.yellow)
	console.log("   |___||_||_| \\__,_|  |_|\\__, | \\___|/__/ \\__| |_|\\___/|_||_|  ".bgRed.black + "-".bgRed.yellow)
	console.log("                          |___/                                 ".bgRed.black + "-".bgRed.yellow)
	console.log("-----------------------------------------------------------".bgWhite.black + pjson.version.bgWhite.black + "-".bgWhite.black)



	var configSettings = '-smtp host: ' + userconfig.host + ' -port: ' + userconfig.port + ' -secure: ' + userconfig.secure
	var configSettingsLine = configSettings
	var i
	for (i = 0; i < (65 - configSettings.length); i++) {
		configSettingsLine += '-'
	}
	console.log(configSettingsLine.bgWhite.black)
}

module.exports = asciiLogo
