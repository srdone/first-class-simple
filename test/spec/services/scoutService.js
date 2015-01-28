'use strict';

describe('The scoutService', function () {
  
  var scoutService, Scout, scout1, scout2;
  
  beforeEach(module('firstClassApp'));
  
  beforeEach(inject( function(scoutService) {
    
    Scout = scoutService;

  }));
  
  it('should return a function', function () {
    expect(Scout).not.toBeUndefined();
  });
  
  it('should create an object firstName, lastName, currentPatrol, and isOA properties equal to what we built it with', function () {
    var firstName = 'Stephen';
    var lastName = 'Done';
    var currentPatrol = 'Owl Patrol'
    var isOA = true;
    
    var scout1 = new Scout(firstName, lastName, currentPatrol, isOA);
    
    expect(scout1.firstName).toBe(firstName);
    expect(scout1.lastName).toBe(lastName);
    expect(scout1.currentPatrol).toBe(currentPatrol);
    expect(scout1.isOA).toBe(isOA);
  });
  
  it('should have a firstName with empty string firstName when not provided', function () {
    var scout1 = new Scout();
    
    expect(scout1.firstName).toBe('');
  });
  
  it('should have a lastName with empty string when lastName not provided', function () {
    var scout1 = new Scout();
    
    expect(scout1.lastName).toBe('');
  });
  
  it('should accept a new position with a blank end date and return that as the current position', function () {
    var scout1 = new Scout();
    scout1.addPosition('Senior Patrol Leader', 'Jan 1, 2014');
    
    expect(scout1.currentPositions().length).toBe(1);
    expect(scout1.currentPositions()[0].title).toBe('Senior Patrol Leader');
  });
  
});