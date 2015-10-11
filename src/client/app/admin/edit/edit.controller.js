(function() {
'use strict';

    angular
        .module('app.admin')
        .controller('EditController', EditController);

    EditController.$inject = ['logger'];
    function EditController(logger) {
        var vm = this;
        vm.title = 'Edit';

        activate();

        ////////////////

        function activate() {
            logger.info('Activated Edit View');
        }
    }
})();