(function () {
    'use strict';

    var controllerId = 'HomeController';

    angular.module('app.home')
        .controller(controllerId, HomeController);

    /* @ngInject */
    function HomeController($q, logger) {
        var vm = this;

        vm.activate = activate;
        vm.title = 'Home';

        activate();

        function activate() {
            var promises = [];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }
    }
})();
