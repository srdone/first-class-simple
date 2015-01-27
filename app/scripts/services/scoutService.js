'use strict';

/**
  * @ngdoc function
  * @name firstClassApp.factory:ScoutService
  * @description
  * # ScoutService
  * Handles database interaction with scout data - controlling access to scout
  * information and handles troop level modifications and access.
  * 
  * Contains all the definitions for a Scout object along with methods on the scout
  * prototype.
  * 
  * @requires RequirementService, dateService, UtilService
  */
angular.module('firstClassApp').factory('ScoutService', function(dateService, UtilService) {
  /**
  * @ngdoc function
  * @name firstClassApp.ScoutService.Scout
  * @description
  * # Scout object
  *
  * All parameters are optional
  * Creates a new scout with various parameters
  * 
  * @param {String} firstName First name of scout
  * @param {String} lastName Last name of scout
  * @param {String} currentPatrol Title of the current patrol
  * @param {boolean} isOA Whether the scout is a member of the Order of the Arrow
  * @param {Array<Requirement>} completedReqs A list of all the requirements a scout has completed
  * @param {Array<Position>} positionHistory A list of positions the scout has held in the troop
  * @param {Array<Camping>} campingHistory A list of campouts the scout has attended
  * @param {Array<Service>} serviceHistory A list of service projects the scout has participated in.
  *
  * @returns {Scout} A scout object
  */
  var Scout = function(firstName, lastName, currentPatrol, isOA, completedReqs,
      positionHistory, campingHistory, serviceHistory) {
    this.id = UtilService.createUUID();
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.currentPatrol = currentPatrol || '';
    this.isOA = isOA || false;
    this._completedReqs = completedReqs || [];
    this._positionHistory = positionHistory || [];
    this._campingHistory = campingHistory || [];
    this._serviceHistory = serviceHistory || [];
  };
  /**
  * @ngdoc function
  * @name firstClassApp.ScoutService.Scout.prototype.currentRank
  * @description
  * # Scout.prototype.currentRank
  * 
  * @returns {String} The current rank held by the scout
  */
  Scout.prototype.currentRank = function() {
      return 'Eagle';
  };
  /**
  * @ngdoc function
  * @name firstClassApp.ScoutService.Scout.prototype.currentPositions
  * @description
  * # Scout.prototype.currentPositions
  * Takes the private variable _positionHistory and compares the dates of the
  * history to the date provided and returns a list of positions that the scout held
  * on that date.
  *
  * @param {Date} date The date to compare positions against
  * @returns {Array<Position>} Array of positions the Scout currently holds
  */
  Scout.prototype.currentPositions = function(date) {
    var currentPos = [];
    var currentDate = date || new Date();
    for (var i = 0; i < this._positionHistory.length; i++) {
      if (!this._positionHistory[i].end) {
        currentPos.push(this._positionHistory[i]);
      } else if (dateService.inRange(currentDate, this._positionHistory[i].start,
                                           this._positionHistory[i].end)) {
        currentPos.push(this._positionHistory[i]);
      }
    }
    return currentPos;
  };
  Scout.prototype.monthsInPosition = function() {
    var currPos = this.currentPositions();
    if (currPos.length > 0) {
      return dateService.totalMonths(currPos);
    } else {
      return 0;
    }
  };
  Scout.prototype.hoursOfService = function() {
    var totalHrs = this._serviceHistory.reduce(function(previous, current) {
      return previous += current.hours;
    }, 0);
    return totalHrs;
  };
  Scout.prototype.qualifiedNightsOfCamping = function() {
    var longestLTC;
    // changed to filter from map - map leaves spaces in the resulting array
    // see http://stackoverflow.com/questions/9289/removing-elements-with-array-map-in-javascript
    var filteredCampouts = this._campingHistory.filter(function (element) {
      // include if it is less than 5 nights long
      // this is the definition of a 'short term camp'
      // see http://blog.scoutingmagazine.org/2012/06/07/ask-the-expert-interpreting-camping-merit-badge-requirement-9a/
      if ( dateService.diff(element.start, element.end) < 5 ) {
        return element;
      } else {
        // include one long term camp
        // replace the current value for the longestLTC if current is longer
        // or if longestLTC isn't set
        if (!longestLTC ||
            (dateService.diff(longestLTC.start, longestLTC.end) < 
             dateService.diff(element.start, element.end))) {
          longestLTC = element;
        }
      }
    });
    //add in the one qualified campout
    filteredCampouts.push(longestLTC);
    var totalQualifiedNights = filteredCampouts.reduce(function (previous, current) {
      return previous += dateService.diff(current.start, current.end);
    }, 0);
    return totalQualifiedNights;
  };
  Scout.prototype.OAQualified = function() {
    return this.isFirstClass() && this.totalQualifiedNights() >= 15;
  };
  //returns true if the scout is at least first class
  Scout.prototype.isFirstClass = function () {
    return true;
  };
  Scout.prototype.addCamping = function(desc, start, end) {
    var camping = new Camping(desc, start, end);
    this._campingHistory.push(camping);
  };
  Scout.prototype.removeCamping = function (id) {
    for (var i = 0; i < this._campingHistory.length; i++) {
      if (this._campingHistory[i].id === id) {
        this._campingHistory.splice(i, 1);
        return true;
      }
    }
    return false;
  };
  Scout.prototype.addPosition = function (title, start, end) {
    var position = new Position(title, start, end);
    this._positionHistory.push(position);
  };
  Scout.prototype.removePosition = function (id) {
    for (var i = 0; i < this._positionHistory.length; i++) {
      if (this._positionHistory[i].id === id) {
        this._positionHistory.splice(i, 1);
        return true;
      }
    }
    return false;
  };
  Scout.prototype.addService = function (title, start, end) {
    var service = new Service(title, start, end);
    this._serviceHistory.push(service);
  };
  Scout.prototype.removeService = function (id) {
    for (var i = 0; i < this._serviceHistory.length; i++) {
      if (this._serviceHistory[i].id === id) {
        this._serviceHistory.splice(i, 1);
        return true;
      }
    }
    return false;
  };
  
  var Position = function (title, start, end) {
    this.id = UtilService.createUUID();
    this.title = title || '';
    this.start = dateService.convert(start);
    this.end = !end ? null : dateService.convert(end);
  };
  
  var Service = function (desc, hours) {
    this.id = UtilService.createUUID();
    this.desc = desc;
    this.hours = hours;
  };
   
  var Camping = function (desc, start, end) {
    this.id = UtilService.createUUID();
    this.desc = desc;
    this.start = dateService.convert(start);
    this.end = dateService.convert(end);
  };
  
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
      var scout = new Scout(firstName, lastName);
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