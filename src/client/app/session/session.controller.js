(function() {
    'use strict';

    angular
        .module('app.session')
        .controller('SessionController', SessionController);

    SessionController.$inject = ['logger'];
    function SessionController(logger) {
        var vm = this;
        vm.title = 'Session';

        activate();

        ////////////////

        function activate() {
            logger.info('Activated Session View');
        }
    }
})();
