'use strict';

var tripControllers = angular.module('tripControllers', []);

tripControllers.controller('TripCtrl', ['$scope', '$http', '$timeout',
    function ($scope, $http, $timeout) {

        $http.get('offers.json').success(function(data) {
            viewCtrl.data = data.offers;

            // Initial set.
            filterSelection(1,1);

        });

        var filterSelection = function(fun_level,beauty_level){
            // Selected offer
            $scope.selectedOffer = [_.find(viewCtrl.data, function(offer){ return offer.fun_level == fun_level && offer.beauty_level == beauty_level })];

            // Remove the selected from list
            var offersFilter = _.reject(viewCtrl.data, function(offer){ return offer.id==$scope.selectedOffer[0].id; });

            offersFilter = _.sortBy(offersFilter, function(offer) {
                return [offer.fun_level, offer.beauty_level].join("_");
            });
            $scope.offersFiltered = offersFilter;
        }

        var getSelectedOffer = function(){
            var fun = parseInt($("#funLevelSlider").val());
            var beauty = parseInt($("#beautyLevelSlider").val());

            filterSelection(fun,beauty);

            setTimeout(function(){
                $scope.$apply();
            },100);

        };

        $scope.orderProp = 'name';

        var sliderPrefs = {
            range: [1, 3],
            start: 1,
            step: 1,
            handles: 1,
            slide: getSelectedOffer
        };

        var sliders = $('#funLevelSlider, #beautyLevelSlider');
        sliders.noUiSlider(sliderPrefs);

}]);
