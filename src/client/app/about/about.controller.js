(function() {
    'use strict';

    angular
        .module('app.about')
        .controller('AboutController', AboutController);

    /* @ngInject */
    function AboutController($q, logger) {
        var vm = this;

        vm.perspic = 'http://lorempixel.com/400/500/people';
        vm.title = 'About';

        activate();

        function activate() {
            var promises = [];
            return $q.all(promises).then(function() {
                logger.info('Activated About View');
            });
        }

        //function getPerspic() {
        //    return dataservice.getPerspic().then(function(data) {
        //        vm.perspic = data;
        //        return vm.perspic;
        //    });
        //}
    }
})();
