define([
	'jquery',
	'backbone',
	'handlebars',
	'collections/projects',
	'text!templates/project-info.hbs'
], function ($, Backbone, Handlebars, projects, projectInfoTemplate) {
	'use strict';

	var ProjectInfoView = Backbone.View.extend({
		el: 'body',
		events: {},
		template: Handlebars.compile(projectInfoTemplate),

		initialize: function (options) {
			var self = this;
			projects.fetch().done(function () {
				self.model = projects.findWhere({ name: options.item });
				self.render();
			});
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
            return this;
		}
	});

	return ProjectInfoView;
});
