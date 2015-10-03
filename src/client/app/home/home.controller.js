(function () {
    'use strict';

    var controllerId = 'HomeController';

    angular.module('app.home')
        .controller(controllerId, HomeController);

    /* @ngInject */
    function HomeController($q, dataservice, logger, Lightbox) {
        var vm = this;

        vm.activate = activate;
        vm.title = 'Home';
        vm.pics = [];
        vm.loadMore = loadMore;
        vm.openLightboxModal = openLightboxModal;

        var brojac = 0;
        //vm.chunkedData = [];

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
                //vm.chunkedData = chunk(vm.pics, 3);
                return vm.pics;
            });
        }

        function loadMore() {
            var brojSlika = 3;
            var last = vm.pics[brojSlika - 1];
            for (var i = 1; i <= 3; i++) {
                brojac++;
                if (brojac < brojSlika) {
                    vm.pics.push(last + i);
                    logger.info('Loaded pic no. ' + brojac);
                }
            }

        }

        function openLightboxModal(index) {
            Lightbox.openModal(vm.pics, index);
        }

        /**
         * chunk za bootstrap kolone
         * @arr, @size
         */
        //function chunk(arr, size) {
        //    var newArr = [];
        //    for (var i = 0; i < arr.length; i += size) {
        //        newArr.push(arr.slice(i, i + size));
        //    }
        //    return newArr;
        //}
    }
})();
