// --------------------------
// - return a random string -
// --------------------------

var randomString = function(stringLength) {
	function makeString(length) {
		var result           = ''
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		var charactersLength = characters.length
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength))
		}

		return result
	}

	return (makeString(stringLength))
}


// *************
// ** Exports **
// *************
module.exports = randomString
