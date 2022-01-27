module.exports = function registerEndpoint(router) {
	router.get('/', (req, res) => res.json({
		"applinks": {
			"apps": [],
			"details": [
			{
				"appID": "94FLWD5X32.com.ydays.easyselling",
				"paths": [
					"/admin/reset-password",
					"/vehicles/share",
				]
			}
		  ]
		},
		"webcredentials": {
			"apps": [
				"94FLWD5X32.com.ydays.easyselling"
			]
		}
	}));
};