(function() {
    'use strict';

    angular
        .module('app.contact')
        .controller('ContactController', ContactController);

    /* @ngInject */
    function ContactController($q, logger) {
        var vm = this;

        vm.title = 'Contact';

        activate();

        function activate() {
            var promises = [];
            return $q.all(promises).then(function() {
                logger.info('Activated Contact View');
            });
        }
    }
})();
