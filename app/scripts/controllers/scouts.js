'use strict';

/**
 * @ngdoc function
 * @name firstClassApp.controller:ScoutDetailCtrl
 * @description
 * # ScoutDetailCtrl
 * Controller of the firstClassApp
 */
angular.module('firstClassApp')
  .controller('ScoutsCtrl', function ($scope, ScoutService) {
    var scouts = ScoutService.getScouts();
    
    $scope.scouts = scouts;
  });