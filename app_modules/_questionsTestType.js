// -------------------------------
// - setup "Test Type" questions -
// -------------------------------

var questionsTestType = [
	{
		type: 'list',
		name: 'testType',
		message: 'Welcome to Indigestion.\n  Please Choose an action.',
		choices: [
			{
				name: '- Send ALL test Emails',
				value: 'send-all-test-emails'
			},
			{
				name: '- Update Userconfig.json',
				value: 'update-userconfig'
			},
			{
				name: '- [-- EXIT --]',
				value: ''
			},
			{
				name: '',
				value: ''
			}
		],
		filter: function (val) {
			return val
		}
	}
]


// *************
// ** Exports **
// *************
module.exports = questionsTestType
