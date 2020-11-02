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
				name: '',
				value: ''
			},
			{
				name: '- Send all test Emails',
				value: 'send-all-test-emails'
			},
			{
				name: '- Create new Email file',
				value: 'create-new-email'
			},
			{
				name: '- Update Userconfig',
				value: 'update-userconfig'
			},
			{
				name: '',
				value: ''
			},
			{
				name: '- [-- EXIT --]',
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
