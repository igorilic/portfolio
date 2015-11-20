(function () {
    'use strict';

    var controllerId = 'HomeController';

    angular.module('app.home')
        .controller(controllerId, HomeController);

    /* @ngInject */
    function HomeController($q, apiService, logger, Lightbox) {
        var vm = this;

        vm.activate = activate;
        vm.title = 'Home';
        // vm.loadMore = loadMore;
        // vm.openLightboxModal = openLightboxModal;
        
        apiService.query(function(data) {
            vm.albums = data;
        });
        
        // var brojac = 0;
        //vm.chunkedData = [];

        activate();

        function activate() {
            var promises = [];
            return $q.all(promises).then(function() {
                logger.info('Activated Home View');
            });
        }

        // function getPics() {
        //     return dataservice.getPics().then(function(data) {
        //         vm.pics = data;
        //         //vm.chunkedData = chunk(vm.pics, 3);
        //         return vm.pics;
        //     });
        // }
   
        // function loadMore() {
        //     var brojSlika = 3;
        //     var last = vm.albums[0].pics[brojSlika - 1];
        //     for (var i = 1; i <= 3; i++) {
        //         brojac++;
        //         if (brojac < brojSlika) {
        //             vm.pics.push(last + i);
        //             logger.info('Loaded pic no. ' + brojac);
        //         }
        //     }

        // }

        // function openLightboxModal(index) {
        //     Lightbox.openModal(vm.albyms, index);
        // }

    }
})();
