define([
	'backbone',
	'backboneLocalstorage',
	'models/project'
], function (Backbone, Store, Project) {
	'use strict';

	var ProjectsCollection = Backbone.Collection.extend({
		model: Project,

		localStorage: new Store('projects'),

		favorite: function () {
			return this.where({ favorite: true });
		}
	});

	return new ProjectsCollection();
});
