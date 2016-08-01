define([
	'jquery',
	'backbone',
    'handlebars',
	'text!templates/project.hbs',
	'models/view-mode'
], function ($, Backbone, Handlebars, projectTemplate, viewMode) {
	'use strict';

	var ProjectView = Backbone.View.extend({
        events: {
			'click .project__ribbon':    'onToggleFavorite'
		},
        className: 'project',

		template: Handlebars.compile(projectTemplate),

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
            this.$favorite = this.$('.project__ribbon');

            return this;
		},

		// (un)select project as a favorite one
        onToggleFavorite: function (event) {
			var self = this;
            var isFavorite = this.model.get('favorite');

			this.model.save({ favorite: !isFavorite }).done(function () {
				// hide non-favorite projects in 'favorite only' view mode
				var condition = ((viewMode.get('mode') === 'favorite') && isFavorite);
				self.$el.toggleClass('hide', condition);

				self.$favorite.toggleClass('project__ribbon_active', !isFavorite);
			});
        }
	});

	return ProjectView;
});
