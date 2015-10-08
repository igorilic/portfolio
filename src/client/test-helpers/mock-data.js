/* jshint -W079 */
var mockData = (function() {
    return {
        getMockPics: getMockPics,
        getMockStates: getMockStates,
        //getPerspic: getPerspic
    };
    //function getPerspic() {
    //    return 'http://lorempixel.com/400/500/people';
    //}

    function getMockStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }

    function getMockPics() {
        return [
            {id: 1, title: 'First Pic!', src: 'http://lorempixel.com/300/400/nightlife'},
            {id: 2, title: 'Second Pic!', src: 'http://lorempixel.com/300/400/nightlife'},
            {id: 3, title: 'Third Pic!', src: 'http://lorempixel.com/300/400/nightlife'}
        ];
    }
})();
