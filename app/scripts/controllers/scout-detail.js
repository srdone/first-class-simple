'use strict';

/**
 * @ngdoc function
 * @name firstClassApp.controller:ScoutDetailCtrl
 * @description
 * # ScoutDetailCtrl
 * Controller of the firstClassApp that provides all the data needed
 * to describe a scout, their camping, service, position, and requirement history.
 * Provides methods to update the scout information.
 */
angular.module('firstClassApp')
  .controller('ScoutDetailCtrl', function ($scope, $routeParams, scoutDataService) {
    var scout = scoutDataService.getScoutById($routeParams.scoutId);
    
    $scope.scout = scout;
    
  });