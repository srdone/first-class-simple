'use strict';

//Source: http://stackoverflow.com/questions/497790
var dateUtil = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        d = d || new Date(); // uses current date if object is null
        return (
            d.constructor === null ? new Date() :
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === 'object' ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
};

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
      positionHistory: [
        {start: 'Jan 1, 2013', end: 'Dec 31, 2013', position: 'WebMaster'},
        {start: 'Jan 1, 2014', end: 'Sep 5, 2014', position: 'Patrol Leader'},
        {start: 'Dec 12, 2014', end: null, position: 'Senior Patrol Leader'}
      ],
      campingHistory: []
    };
    $scope.scout.currentRank = function() {
      return 'Eagle';
    };
    $scope.scout.currentPositions = function(date) {
      var currentPositions = [];
      var currentDate = date || new Date();
      var hist = this.positionHistory; //make the ref shorter
      for (var i = 0; i < hist.length; i++) {
        if (dateUtil.inRange(currentDate, hist[i].start, hist[i].end)) {
          currentPositions.push(hist[i].position);
        }
      }
      return currentPositions;
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