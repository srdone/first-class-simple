'use strict';

angular.module('firstClassApp').factory('ScoutService', function(dateService) {
  var Scout = function(firstName, lastName, currentPatrol, isOA, completedReqs,
      positionHistory, campingHistory, serviceHistory) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.currentPatrol = currentPatrol || '';
    this.isOA = isOA || false;
    this.completedReqs = completedReqs || [];
    this.positionHistory = positionHistory || [];
    this.campingHistory = campingHistory || [];
    this.serviceHistory = serviceHistory || [];
  };
  Scout.prototype.currentRank = function() {
      return 'Eagle';
  };
  Scout.prototype.currentPositions = function(date) {
    var currentPositions = [];
    var currentDate = date || new Date();
    var hist = this.positionHistory; //make the ref shorter
    for (var i = 0; i < hist.length; i++) {
    if (dateService.inRange(currentDate, hist[i].start, hist[i].end)) {
        currentPositions.push(hist[i].title);
      }
    }
    return currentPositions;
  };
  Scout.prototype.monthsInPosition = function() {
    return 6;
  };
  Scout.prototype.hoursOfService = function() {
    var totalHrs = this.serviceHistory.reduce(function(previous, current) {
      return previous += current.hours;
    }, 0);
    return totalHrs;
  };
  Scout.prototype.qualifiedNightsOfCamping = function() {
    var longestLTC;
    // changed to filter from map - map leaves spaces in the resulting array
    // see http://stackoverflow.com/questions/9289/removing-elements-with-array-map-in-javascript
    var filteredCampouts = this.campingHistory.filter(function (element) {
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
  
  var Position = function (title, start, end) {
    this.title = title || '';
    this.start = start || null;
    this.end = end || null;
  };
  
  var Service = function (desc, hours) {
    this.desc = desc;
    this.hours = hours;
  };
   
  var Camping = function (desc, start, end) {
    this.desc = desc;
    this.start = start;
    this.end = end;
  };
  
  var scout = new Scout('Stephen', 'Done', 'Owl Patrol', true);
  scout.positionHistory = [
    new Position('WebMaster', 'Jan 1, 2013', 'Dec 31, 2013'),
    new Position('Patrol Leader', 'Jan 1, 2014', 'Sep 5, 2014'),
    new Position('Senior Patrol Leader', 'Dec 12, 2014')
  ];
  scout.serviceHistory = [
    new Service('Cleaning the park', 2),
    new Service('Painting the church', 1),
    new Service('Cleaning the ditches', 0.5)
  ];
  scout.campingHistory = [
    new Camping('Goblin Valley', 'Jan 1, 2012', 'Jan 2, 2012'),
    new Camping('Deer Creek', 'Sep 5, 2013', 'Sep 6, 2013'),
    new Camping('Zion National Park', 'Sep 10, 2014', 'Sep 13, 2014'),
    new Camping('Maple Dell', 'July 10, 2014', 'July 15, 2014'),
    new Camping('Orange Groves', 'Aug 13, 2014', 'Aug 16, 2014'),
    new Camping('Camporee', 'Aug 17, 2014', 'Aug 19, 2014')
  ];
  
  return scout;
});