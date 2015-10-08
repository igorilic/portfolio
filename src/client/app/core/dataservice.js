(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            getPics: getPics,
            getMessageCount: getMessageCount,
            //getPerspic: getPerspic
        };

        return service;

        //function getPerspic() {
        //    return $http.get('/api/perspic')
        //        .then(success)
        //        .catch(fail);
        //
        //    function success(response) {
        //        return response.data;
        //    }
        //
        //    function fail(e) {
        //        return exception
        //            .catcher('XHR failed for getting perspic')(e);
        //    }
        //}

        function getMessageCount() { return $q.when(72); }

        function getPics() {
            return $http.get('/api/pics')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPics')(e);
            }
        }
    }
})();
