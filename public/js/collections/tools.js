define([
	'underscore',
	'backbone',
	'models/project',
	'models/favorite-tool'
], function (_, Backbone, Project, favoriteTool) {
	'use strict';

	// list of tools can be updated
	// so we fetch data from json config every time
	// and don't store in localStorage
    var Tools = Backbone.Collection.extend({
        url: 'config/tools.json',

		initialize: function () {
			favoriteTool.fetch({ silent: true });
		},

		// returns favorite model
		// or false if favorite doesn't exist
		getFavorite: function () {
			var result = this.get(favoriteTool.get('value'));
			return _.isUndefined(result) ? false : result;
		},

		// returns set of all models exclude favorite one
		getNonFavorite: function () {
			var self = this;
			var nonFavorites = new Backbone.Collection(self.models);
			nonFavorites.remove(favoriteTool.get('value'));

			return nonFavorites.models;
		}

    });

	return new Tools();
});
