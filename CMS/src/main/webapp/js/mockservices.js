'use strict';


var myAppDev = angular.module('myAppDev', ['ngdemo.controllers','ngdemo', 'ngMockE2E']);


myAppDev.run(function($httpBackend) {
	
  var consultants = [{firstName: 'Sam', lastName:'Perera'}, {firstName: 'Randy', lastName:'SamaranayakeS'}];

  // returns the current list of phones
  $httpBackend.whenGET('/^\/ngdemo\/web/').respond(consultants);

  // adds a new phone to the phones array
/*  $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
    var phone = angular.fromJson(data);
    phones.push(phone);
    return [200, phone, {}];
  });*/
 // $httpBackend.whenGET(/^\/templates\//).passThrough(); // Requests for templates are handled by the real server
  //...
});


