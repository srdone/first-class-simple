'use strict';

/**
 * @ngdoc function
 * @name firstClassApp.controller:ScoutDetailCtrl
 * @description
 * # TroopCtrl
 * Controller of the firstClassApp
 */
angular.module('firstClassApp')
  .controller('TroopCtrl', function ($scope, ScoutService) {
    var scouts = ScoutService.getScouts();
    
    $scope.scouts = scouts;
    
    $scope.createScout = function (firstName, lastName) {
      console.log('in controller create');
      ScoutService.createScout(firstName, lastName);
    };
    
    $scope.createMode = false;
  });