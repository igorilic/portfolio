(function() {
'use strict';

	angular
		.module('app.core')
		.factory('apiService', apiService);

	apiService.$inject = ['$resource'];
	function apiService($resource) {
		return $resource('/api/albums/:albumID');
	}
})();