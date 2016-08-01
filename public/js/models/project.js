define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Project = Backbone.Model.extend({
		defaults: {
			favorite: false
		}
	});

	return Project;
});
