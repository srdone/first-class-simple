'use strict';

/**
 * @ngdoc function
 * @name firstClassApp.controller:ScoutDetailCtrl
 * @description
 * # TroopCtrl
 * Controller of the firstClassApp
 */
angular.module('firstClassApp')
  .controller('TroopCtrl', function ($scope, scoutDataService) {
    var scouts = scoutDataService.getScouts();
    console.log(scouts);
    $scope.scouts = scouts;
    
    $scope.createScout = function (firstName, lastName) {
      console.log('in controller create');
      scoutDataService.createScout(firstName, lastName);
    };
    
    $scope.createMode = false;
  });