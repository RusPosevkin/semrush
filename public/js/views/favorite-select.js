define([
	'jquery',
	'underscore',
	'backbone',
    'handlebars',
	'text!templates/favorite-select.hbs',
	'collections/tools',
	'models/favorite-tool'
], function ($, _, Backbone, Handlebars, favoriteSelectTemplate, tools, favoriteTool) {
	'use strict';

	var FavoriteSelectView = Backbone.View.extend({
        el: '#favorite-select',
		model: favoriteTool,
		events: {},

		template: Handlebars.compile(favoriteSelectTemplate),

		initialize: function () {
			this.listenTo(tools, 'sync', this.onRender);
			tools.fetch({ silent: true });
		},

		onRender: function () {
			var data = [];

			_.each(tools.models, function (model) {
				data.push(model.toJSON());
			});
			this.$el.html(this.template(data));

			this.$title = this.$('#select-title');

			// listen changes of favorite tool select
			this.delegateEvents(_.extend(this.events, { 'change #favorite-select': 'onChangeFavorite' }));

			this.onChangeTitle();
			var favorite = tools.getFavorite();
			if (favorite) {
				this.$el.find("#"+ favorite.get('id')).attr('selected', 'selected');
			}
		},

		// beautify: actualize select's title
		onChangeTitle: function () {
			var favorite = tools.getFavorite();
			var text = favorite ? favorite.get('name') : '';
			this.$title.text(text);
		},

		// change favorite tool
		onChangeFavorite: function (event) {
			var self = this;

			this.model.save({ value: event.target.value }, { silent: true }).done(function () {
				self.onChangeTitle();
			});
		}
	});

	return FavoriteSelectView;
});
