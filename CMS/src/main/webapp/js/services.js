'use strict';

/* Services */
/* Services invoked by constructors */
/*
 http://docs.angularjs.org/api/ngResource.$resource

 Default ngResources are defined as

 'get':    {method:'GET'},
 'save':   {method:'POST'},
 'query':  {method:'GET', isArray:true},
 'remove': {method:'DELETE'},
 'delete': {method:'DELETE'}

 */

var services = angular.module('ngdemo.services', ['ngResource']);

//http://localhost:8080/ngdemo/web/dummy

services.factory('DummyFactory', function ($resource) {
    return $resource('/ngdemo/web/dummy', {}, {
        query: { method: 'GET', params: {}, isArray: false }
    })
});

services.factory('ProjectFactory', function ($resource) {
    return $resource('/ngdemo/web/users/getProjects:id', {}, {
        query: { method: 'GET', params: {id: '@id'}, isArray: true },
        query1: { method: 'GET', params: {id: '@id'}, isArray: true },
        createNewUser: { method: 'POST' }
    })
});

services.factory('CreateProjectFactory', function ($resource) {
    return $resource('/ngdemo/web/users/createNewUser', {}, {
        query: { method: 'GET', params: {id: '@id'}, isArray: true },
        query1: { method: 'GET', params: {id: '@id'}, isArray: true },
        createNewUser: { method: 'POST' }
    })
});

services.factory('UsersFactory', function ($resource) {
    return $resource('/ngdemo/web/users', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});



services.factory('UserFactory', function ($resource) {
    return $resource('/ngdemo/web/users/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

services.factory('restservices', function($resource){
	
	var dataFactory = {};
	
    dataFactory.getCustomer = function () {
		return $resource('/ngdemo/web/users/getProjects:id', {}, {
			query: { method: 'GET', params: {id: '@id'}, isArray: true },
			createNewUser: { method: 'POST' }
		})

    };
	
	dataFactory.loadCustomers = function () {
		
		var student = {
         firstName: "Mahesh",
         lastName: "Parashar"
		 };
		 
		 return student;
    };
	
	return dataFactory;
	
});


services.factory('ConsultantFactory', function($resource){
	
	var dataFactory = {};
	
    dataFactory.getConsultants = function () {
		return $resource('/ngdemo/web/users:id', {}, {
			query: { method: 'GET', isArray: true },
			query: { method: 'GET', isArray: true },
			createNewUser: { method: 'POST' },
			delete: { method: 'DELETE', params: {id: '@id'} }
		})
    };
	
	dataFactory.getConsultant = function () {
		return $resource('/ngdemo/web/users:id', {}, {
			get: { method: 'GET', params: {id: '@id'}, isArray: false }
		})
    };
	
   dataFactory.deleteConsultants = function () {
		return $resource('/ngdemo/web/users/:id', {}, {
			delete: { method: 'DELETE', params: {id: '@id'} }
		})
    };
    
    dataFactory.updateConsultants = function () {
		return $resource('/ngdemo/web/users/:id', {}, {
			update: { method: 'PUT', params: {id: '@id'} }
		})
    };
	return dataFactory;
	
});





