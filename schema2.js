{
	properties: {
		author: {
			description: "your name",
			message: "you really should know this",
			default: "author",
			required: true
		},
		appName: {
			description: "name of your app",
			message: "come on, give it a name",
			default: "appName",
			required: true
		},
		multiPage: {
			description: "include multi-page routing",
			message: "this is simple, either y or n",
			default: "y",
			required: true
		},
		ajax: {
			description: "include AJAX examples",
			message: "this is simple, either y or n",
			default: "y",
			required: true
		}
	}
}
