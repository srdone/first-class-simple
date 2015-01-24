'use strict';

/**
 * @ngdoc function
 * @name firstClassApp.controller:FirstClassSimple
 * @description
 * # FirstClassSimple
 * Controller of the firstClassApp
 */
angular.module('firstClassApp')
  .controller('ScoutDetailCtrl', function ($scope) {
    $scope.scout = {
      firstName: 'Stephen',
      lastName: 'Done',
      isOA: false,
      completedReqs: [],
      currentPatrol: 'Owl Patrol',
      positionHistory: [],
      campingHistory: []
    };
    $scope.scout.currentRank = function() {
      return 'Eagle';
    };
    $scope.scout.currentPosition = function() {
      return 'Senior Patrol Leader';
    };
    $scope.scout.monthsInPosition = function() {
      return 6;
    };
    $scope.scout.hoursOfService = function() {
      return 10;
    };
    $scope.scout.daysOfCamping = function() {
      return 20;
    };
    $scope.scout.OAQualified = function() {
      return false;
    };
  });