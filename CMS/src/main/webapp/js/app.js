'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('ngdemo', [ 'ngdemo.filters', 'ngdemo.services', 'ngdemo.directives', 'ngdemo.controllers', 'ngMockE2E']).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/dummy', {
				templateUrl : 'partials/dummy.html',
				controller : 'DummyCtrl'
			});
			$routeProvider.when('/consultant-list', {
				templateUrl : 'partials/consultant-list.html',
				controller : 'ConsultantCtrl'
			});
			$routeProvider.when('/user-detail/:id', {
				templateUrl : 'partials/consultant-detail.html',
				controller : 'ConsultantDetailCtrl'
			});
			$routeProvider.when('/user-creation', {
				templateUrl : 'partials/user-creation.html',
				controller : 'UserCreationCtrl'
			});
			$routeProvider.when('/project-list', {
				templateUrl : 'partials/project-list.html',
				controller : 'ProjectCtrl'
			});
			$routeProvider.when('/project-creation', {
				templateUrl : 'partials/project-creation.html',
				controller : 'ProjectCreateController'
			});
			$routeProvider.when('/user-info/:id', {
				templateUrl : 'partials/consultant-detail.html',
				controller : 'ConsultantDetailCtrl'
			});
			$routeProvider.when('/consultant-add', {
				templateUrl : 'partials/consultant-add.html',
				controller : 'ConsultantCtrl'
			});
			$routeProvider.otherwise({
				redirectTo : '/dummy'
			});
} ]);


app.run(function($httpBackend) {

  var phones = [{name: 'phone1'}, {name: 'phone2'}]; 
  var consultants = [{id:1, firstName: 'Sam', lastName:'Perera', allocation:'100%', location:'Dialog Office',  background: 'Angular', photoURL: 'http://localhost:8080/ngdemo/img/consultant/001.jpg'}, 
                     {id:2, firstName: 'Randy', lastName:'SamaranayakeS' , allocation:'50%',location:'DEPI',  background: 'Java/J2EE', photoURL: 'http://localhost:8080/ngdemo/img/consultant/002.jpg'}, 
                     {id:3, firstName: 'Suraj', lastName:'Mapa', allocation:'25%', location:'DELWP',  background: 'MS .NET', photoURL: 'http://localhost:8080/ngdemo/img/consultant/003.jpg'},
                     {id:4, firstName: 'Dinesh', lastName:'Wijekoon', allocation:'25%', location:'DELWP',  background: 'MS .NET', photoURL: 'http://localhost:8080/ngdemo/img/consultant/001.jpg'},
                     {id:5, firstName: 'Lusantha', lastName:'Don', allocation:'25%', location:'DELWP',  background: 'MS .NET', photoURL: 'http://localhost:8080/ngdemo/img/consultant/001.jpg'},
                     {id:6, firstName: 'John', lastName:'MC', allocation:'25%', location:'DELWP',  background: 'MS .NET', photoURL: 'http://localhost:8080/ngdemo/img/consultant/002.jpg'},
                     {id:7, firstName: 'Sanjeewa', lastName:'Perera', allocation:'25%', location:'DELWP',  background: 'MS .NET', photoURL: 'http://localhost:8080/ngdemo/img/consultant/001.jpg'},
                     {id:8, firstName: 'Sandun', lastName:'Samarathunge', allocation:'25%', location:'DELWP',  background: 'MS .NET', photoURL: 'http://localhost:8080/ngdemo/img/consultant/002.jpg'}];
  console.log("Getting phones");
  
  
  $httpBackend.whenGET('/ngdemo/web/users').respond(function(method,url,data) {
    console.log("Getting phones : "+ url);
    return [200, consultants, {}];
  });
  
  $httpBackend.whenDELETE(/^\/ngdemo\/web\/users\/\d+$/).respond(function(method,url,data, headers, params) {
     console.log("Delete User");
     
     var regex = /^\/ngdemo\/web\/users\/(\d+)/g;

     var id = regex.exec(url)[1]; // First match on the second item.
     id = parseInt(id, 10);
     
     console.log('whenDELETE '+id);
     console.log('whenDELETE '+consultants);
     
     angular.forEach(consultants, function(value, key) {
    	
    	 var index = 0;
    	 if(value.id == id){
    		 console.log('Delete Index '+ value.firstName);
    		// consultants.indexOf(value);
    		 consultants.splice(consultants.indexOf(value), 1);
    		 index++;
    	 }
     });

     return [200, {consultants}, {}];
  });
  
  $httpBackend.whenPUT(/^\/ngdemo\/web\/users\/\d+$/).respond(function(method,url,data) {
    console.log("Update Users : "+ url);
    return [200, consultants, {}];
  });
  
  $httpBackend.whenGET(/^\/ngdemo\/web\/users\/\d+$/).respond(function(method,url,data) {
	    console.log("Update Users : "+ url);
	     var regex = /^\/ngdemo\/web\/users\/(\d+)/g;

	     var id = regex.exec(url)[1]; // First match on the second item.
	     id = parseInt(id, 10);
	     console.log('whenGET '+id);
	     var index;
	     var consultant;
	     //var item = JSON.parse(data);
	     
	     angular.forEach(consultants, function(value, key) {
	    	 if(value.id == id){
	    		 console.log('Update The Consultant Object '+ value.firstName);
	    		 //consultants.push(item);
	    		 consultant = value;
	    		 index++;
	    	 }
	     });
	     
	    return [200, consultant, {}];
  });
  
  $httpBackend.whenGET(/partials/).passThrough();
  
});