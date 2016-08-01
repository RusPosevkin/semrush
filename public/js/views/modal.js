define([
	'jquery',
	'backbone',
    'handlebars',
    'text!templates/modal.hbs',
    'models/project',
    'collections/projects',
	'backbone.modal'
], function ($, Backbone, Handlebars, modalTemplate, Project, projects) {
	'use strict';

	var Modal = Backbone.Modal.extend({
    	template:  Handlebars.compile(modalTemplate),

		submitEl: '.modal__submit-button',
    	cancelEl: '.modal__close-button',

		beforeSubmit: function () {
			var $projectName = this.$('#project-name');
			var $projectUrl = this.$('#project-url');
			var nameValue = $projectName.val();
			var urlValue = $projectUrl.val();

			var pattern = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/;
			var isUrl = pattern.test(urlValue);

			// duplicate projects doesn't allow
			var isProjectExist = projects.where({ name: nameValue }).length;

            // highlight input with incorrect value
            $projectUrl.toggleClass('modal__input_error', !isUrl);
			$projectName.toggleClass('modal__input_error', !((nameValue !== '') && !isProjectExist));

			if ((nameValue !== '') && isUrl && !isProjectExist) {
				var isSaved = false;
				var model = new Project({ name: nameValue, domain: urlValue.replace('http://', '') });
				projects.add(model);
				model.save().done(function () {
					isSaved = true;
				});
				return isSaved;
			}
			return false;
		}
    });

	return Modal;
});
