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
				name: '- Send ALL test Emails',
				value: 'send-all-test-emails'
			},
			// {
			// 	name: '- Run single TEST',
			// 	value: 'run-single-test'
			// },
			// {
			// 	name: '- Run single TEST [tree selection]',
			// 	value: 'run-single-test-tree'
			// },
			// {
			// 	name: '',
			// 	value: ''
			// },
			// {
			// 	name: '- Run TEST group',
			// 	value: 'run-test-group'
			// },
			// {
			// 	name: '- Run TEST group [tree selection]',
			// 	value: 'run-test-group-tree'
			// },
			// {
			// 	name: '',
			// 	value: ''
			// },
			// {
			// 	name: '- Open existing REPORT',
			// 	value: 'open-report'
			// },
			// {
			// 	name: '',
			// 	value: ''
			// },
			// {
			// 	name: '- Set ENVIRONMENT',
			// 	value: 'set-environment'
			// },
			// {
			// 	name: '- Set NUMBER of THREADS',
			// 	value: 'set-num-threads'
			// },
			// {
			// 	name: '',
			// 	value: ''
			// },
			// {
			// 	name: '- List existing REPORTS',
			// 	value: 'list-reports'
			// },
			// {
			// 	name: '- List single TESTS',
			// 	value: 'list-single-tests'
			// },
			// {
			// 	name: '- List TEST Groups',
			// 	value: 'list-test-groups'
			// },
			// {
			// 	name: '',
			// 	value: ''
			// },
			// {
			// 	name: '- Delete a REPORT',
			// 	value: 'delete-a-report'
			// },
			// {
			// 	name: '- Delete All REPORTS',
			// 	value: 'delete-all-reports'
			// },
			// {
			// 	name: '',
			// 	value: ''
			// },
			// {
			// 	name: '- Generate singe TEST Cmd with Debug',
			// 	value: 'debug-mode'
			// },
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
