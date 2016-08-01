define([
	'backbone',
    'backboneLocalstorage'
], function (Backbone, Store) {
	'use strict';

	var ViewMode = Backbone.Model.extend({
        defaults: {
            mode: 'all'
        },
        localStorage: new Store('view-mode')
	});

	return new ViewMode({ id: 1 });
});
