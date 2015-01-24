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
  Scout.prototype.daysOfCamping = function() {
    return 20;
  };
  Scout.prototype.OAQualified = function() {
    return false;
  };
  
  var Position = function(title, start, end) {
    this.title = title || '';
    this.start = start || null;
    this.end = end || null;
  };
  
  var Service = function (desc, hours) {
    this.desc = desc;
    this.hours = hours;
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
  
  return scout;
});