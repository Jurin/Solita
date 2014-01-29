'use strict';

var solitaApp = angular.module('solitaApp', [
  'ngRoute',
  'ngAnimate',
  //'ngResource',
  //'ngSanitize',
  'tripControllers'
]).
   filter('slash', function() {
        return function(text) {
            if(typeof text == undefined)
                return false;

            return text.replace('e/hlö', "");
        }
    }).
   config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/trip.html',
        controller: 'TripCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

var viewCtrl = {};
viewCtrl.data = "";