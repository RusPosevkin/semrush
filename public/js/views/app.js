define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'views/favorite-select',
	'views/project',
	'collections/projects',
	'collections/tools',
	'text!templates/project-tools.hbs',
	'models/favorite-tool',
	'views/modal',
	'models/view-mode',
	'backbone.modal'
], function ($, _, Backbone, Handlebars, FavoriteSelectView, ProjectView,
	projects, tools, projectToolsTemplate, favoriteTool, Modal, viewMode) {
	'use strict';

	var AppView = Backbone.View.extend({
		el: 'body',
		events: {
			'click #add-project': 'onAddProjectClick'
		},

		initialize: function () {
			var self = this;

			this.$favoriteSelect = this.$('#favorite-select');
			this.$main = this.$('#main');

			var complete = _.invoke([tools, projects], 'fetch', { reset: true });

			$.when.apply($, complete).done(function() {
				viewMode.fetch().always(function () {
					self.onRender();
				});
			});
		},

		onRender: function () {
			var favoriteView = new FavoriteSelectView();
			this.$favoriteSelect.append(favoriteView.render().el);

			var mode = (viewMode.get('mode') === 'favorite') ? 'favorite' : 'all';
			this.$('#switcher-' + mode).addClass('active');

			this.onRenderProjects();

			this.listenTo(viewMode, 'sync', this.onRenderProjects);
			this.listenTo(favoriteTool, 'sync', this.onRenderTools);
			this.delegateEvents(_.extend(this.events, { 'click .header__switcher': 'onSwitcherClick' }));

			this.$projects = this.$('.project');

			this.listenTo(projects, 'add', this.onProjectAdd);
		},

		// render projects rows
		onRenderProjects: function () {
			// multiple view renders, once append
			var data = (viewMode.get('mode') === 'favorite') ? projects.favorite() : projects.models;
			var result = [];

            _.each(data, function (model) {
				var projectView = new ProjectView({ model: model });
				result.push(projectView.render().el)
            });

			this.$main.empty().append(result);
			this.onRenderTools();
		},

		// return HTML layout for tools block of project
		getToolsLayout: function () {
			var data = {};
			var favorite = tools.getFavorite();

			data.favorite = favorite ? favorite.toJSON() : false;
			data.tools = _.map(tools.getNonFavorite(), function (item) {
				return item.toJSON();
			});

			var template = Handlebars.compile(projectToolsTemplate);
			return template(data);
		},

		// render tools list to project block
		onRenderTools: function () {
			// cache tools layout
			// update when favorite tool will be changed
			this.toolsLayout = this.getToolsLayout();
			this.$('.tools').html(this.toolsLayout);
		},

		// called when new project model added
		onProjectAdd: function (model) {
			var view = new ProjectView({ model: model });
			var elem = view.render();

			elem.$el.find('.tools').html(this.toolsLayout);

			// if view mode is favorite only
			// then hide project by default
			elem.$el.toggleClass('hide', viewMode.get('mode') === 'favorite');
			this.$main.append(elem.el);
		},

		// filter switcher: show all or favorite only projects
		onSwitcherClick: function (event) {
			var isActive = $(event.target).hasClass('active');

			if (isActive) return;

			var mode = event.target.id === 'switcher-favorite' ? 'favorite' : 'all';
			viewMode.save({ mode: mode }).done(function () {
				// if there are only 2 positions of switcher-favorite
				// then we can just toggle there
				$(event.currentTarget).find('span').toggleClass('active');
			});
		},

		// add new project
		onAddProjectClick: function () {
			var modalView = new Modal();
			this.$('#modal').html(modalView.render().el);
		}
	});

	return AppView;
});
