(function () {
    'use strict';

    var controllerId = 'HomeController';

    angular.module('app.home')
        .controller(controllerId, HomeController);

    /* @ngInject */
    function HomeController($q, dataservice, logger) {
        var vm = this;

        vm.activate = activate;
        vm.title = 'Home';
        vm.pics = [];
        vm.loadMore = loadMore;

        activate();

        function activate() {
            var promises = [getPics()];
            return $q.all(promises).then(function() {
                logger.info('Activated Home View');
            });
        }

        function getPics() {
            return dataservice.getPics().then(function(data) {
                vm.pics = data;
                return vm.pics;
            });
        }

        function loadMore() {
            var last = vm.pics[vm.pics.length - 1];
            for (var i = 1; i <= 3; i++) {
                vm.pics.push(last + i);
                logger.info('Loaded pic' + last);
            }

        }
    }
})();
