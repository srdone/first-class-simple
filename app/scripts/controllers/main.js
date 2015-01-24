'use strict';

/**
 * @ngdoc function
 * @name firstClassApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firstClassApp
 */
angular.module('firstClassApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
