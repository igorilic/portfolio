/* jshint -W117, -W030 */
describe('ContactController', function() {
    var controller;
    //var perspic = mockData.getPerspic();

    beforeEach(function() {
        bard.appModule('app.contact');
        bard.inject('$controller', '$log', '$q', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('ContactController');
        $rootScope.$apply();
    });

    //bard.verifyNoOutstandingHttpRequests();

    describe('Contact controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Contact', function () {
                expect(controller.title).to.equal('Contact');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });

        });
    });
});
