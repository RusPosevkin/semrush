define([
	'backbone',
	'backboneLocalstorage'
], function (Backbone, Store) {
	'use strict';

	var FavoriteTool = Backbone.Model.extend({
		defaults: {
			value: ''
		},

        localStorage: new Store('favorite-tool')
	});

	return new FavoriteTool({ id: 1 });
});
