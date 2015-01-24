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
      currentRank: 'Eagle',
      currentPatrol: 'Owl Patrol',
      currentPosition : 'Senior Patrol Leader',
      isOA : true,
      monthsInPosition: 6,
      hoursOfService: 10,
      daysOfCamping: 20
    };
  });