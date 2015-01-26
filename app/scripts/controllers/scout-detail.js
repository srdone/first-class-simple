'use strict';

/**
 * @ngdoc function
 * @name firstClassApp.controller:ScoutDetailCtrl
 * @description
 * # ScoutDetailCtrl
 * Controller of the firstClassApp
 */
angular.module('firstClassApp')
  .controller('ScoutDetailCtrl', function ($scope, $routeParams, ScoutService) {
    var scout = ScoutService.getScoutById($routeParams.scoutId);
    
    $scope.scout = scout;
    
    $scope.createScout = function (firstName, lastName) {
      console.log('in controller create');
      ScoutService.createScout(firstName, lastName);
    };
    
    $scope.createMode = false;
  });