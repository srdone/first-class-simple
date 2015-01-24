'use strict';

/**
 * @ngdoc function
 * @name firstClassApp.controller:ScoutDetailCtrl
 * @description
 * # ScoutDetailCtrl
 * Controller of the firstClassApp
 */
angular.module('firstClassApp')
  .controller('ScoutDetailCtrl', function ($scope, ScoutService) {
    $scope.scout = ScoutService;
  });