'use strict';

/**
  * @ngdoc function
  * @name firstClassApp.factory:scoutDataService
  * @description
  * # ScoutService
  * Handles database interaction with scout data - controlling access to scout
  * information and handles troop level modifications and access.
  * 
  * @requires RequirementService, dateService, utilService
  */
angular.module('firstClassApp')
  .factory('scoutDataService', function(scoutService) {
  
  var Scout = scoutService;
  
  var scouts = {};
  
  var scout = new Scout('Stephen', 'Done', 'Owl Patrol', true);
  scout.addPosition('WebMaster', 'Jan 1, 2013', 'Dec 31, 2013');
  scout.addPosition('Patrol Leader', 'Jan 1, 2014', 'Sep 5, 2014');
  scout.addPosition('Senior Patrol Leader', 'Dec 12, 2014');
  scout.addService('Cleaning the park', 2);
  scout.addService('Painting the church', 1);
  scout.addService('Cleaning the ditches', 0.5);
  scout.addCamping('Goblin Valley', 'Jan 1, 2012', 'Jan 2, 2012');
  scout.addCamping('Deer Creek', 'Sep 5, 2013', 'Sep 6, 2013');
  scout.addCamping('Zion National Park', 'Sep 10, 2014', 'Sep 13, 2014');
  scout.addCamping('Maple Dell', 'July 10, 2014', 'July 15, 2014');
  scout.addCamping('Orange Groves', 'Aug 13, 2014', 'Aug 16, 2014');
  scout.addCamping('Camporee', 'Aug 17, 2014', 'Aug 19, 2014');
  scouts[scout.id] = scout;
  
  var scout2 = new Scout('Timothy', 'Done', 'Buffalo Patrol', true);
  scout2.addPosition('Patrol Leader', 'Jan 23, 2013', 'Sep 5, 2014');
  scout2.addService('Cleaning the park', 2);
  scout2.addService('Painting the church', 1);
  scout2.addService('Cleaning the ditches', 3.5);
  scout2.addCamping('Zion National Park', 'Sep 10, 2014', 'Sep 13, 2014');
  scout2.addCamping('Maple Dell', 'July 10, 2014', 'July 15, 2014');
  scout2.addCamping('Orange Groves', 'Aug 13, 2014', 'Aug 16, 2014');
  scout2.addCamping('Camporee', 'Aug 17, 2014', 'Aug 19, 2014');
  scouts[scout2.id] = scout2;
  
  return {
    createScout: function (firstName, lastName) {
      console.log('in service create');
      var scout = new scoutService.Scout(firstName, lastName);
      scouts[scout.id] = scout;
      return scout;
    },
    getScoutById: function (id) {
      return scouts[id];
    },
    getScouts: function() {
      var scoutsArray = [];
      for (var key in scouts) {
        if (scouts.hasOwnProperty(key)) {
          scoutsArray.push(scouts[key]);
        }
      }
      return scouts;
    }
  };
});