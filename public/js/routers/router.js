define([
	'jquery',
	'backbone',
	'views/app'
], function ($, Backbone, AppView) {
	'use strict';

	var Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'project/:item': 'projectInfo'
		},

		index: function () {
			 new AppView();
		}
	});

	return Router;
});
