/* jshint -W117, -W030 */
describe('AboutController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.about');
        bard.inject('$controller', '$log', '$q', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('AboutController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Home controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of About', function () {
                expect(controller.title).to.equal('About');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });

        });
    });
});
