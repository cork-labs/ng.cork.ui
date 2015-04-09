describe('ng.cork.ui', function () {
    'use strict';

    beforeEach(module('ng.cork.ui'));

    describe('ng.cork.ui.keys', function () {

        it('should require the module', inject(function (corkUiKeysCodes) {

            expect(typeof corkUiKeysCodes).toBe('object');
        }));
    });
});
