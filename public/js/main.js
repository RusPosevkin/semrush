'use strict';

require.config({
	text: {
	    useXhr: function (url, protocol, hostname, port) {
	        return true;
	    }
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		handlebars: {
			exports: 'Handlebars'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: '../node_modules/jquery/dist/jquery',
		underscore: '../node_modules/underscore/underscore',
		backbone: '../node_modules/backbone/backbone',
		backboneLocalstorage: '../node_modules/backbone.localstorage/backbone.localStorage',
		handlebars: '../node_modules/handlebars/dist/handlebars',
		text: '../node_modules/requirejs-text/text',
		'backbone.modal': 'lib/backbone.modal'
	}
});

require([
	'backbone',
	'routers/router',
	'views/project-info'
], function (Backbone, Workspace, ProjectInfoView) {
	var appRouter = new Workspace();
	appRouter.on('route:projectInfo', function (item) {
		new ProjectInfoView({ item: item });
	});

	Backbone.history.start();
});
