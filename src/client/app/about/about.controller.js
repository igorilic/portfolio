(function() {
    'use strict';

    angular
        .module('app.about')
        .controller('AboutController', AboutController);

    /* @ngInject */
    function AboutController($q, logger) {
        var vm = this;

        vm.title = 'About';

        activate();

        function activate() {
            var promises = [];
            return $q.all(promises).then(function() {
                logger.info('Activated About View');
            });
        }
    }
})();
