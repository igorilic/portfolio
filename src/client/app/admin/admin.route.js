(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'app/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    title: 'Admin',
                    settings: {

                    }
                }
            },
            {
                state: 'admin.upload',
                config: {
                    url: '/admin/upload',
                    templateUrl: 'app/admin/upload/upload.html',
                    controller: 'UploadController',
                    controllerAs: 'vm',
                    title: 'Upload Pics',
                    settings: {

                    }
                }
            },
            {
                state: 'admin.edit',
                config: {
                    url: '/admin/edit',
                    templateUrl: 'app/admin/edit/edit.html',
                    controller: 'EditController',
                    controllerAs: 'vm',
                    title: 'Edit Albums',
                    settings: {

                    }
                }
            }
        ];
    }
})();
