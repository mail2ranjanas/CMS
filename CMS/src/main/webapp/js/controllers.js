'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers', []);


// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});


app.controller('ProjectCreateController', ['$scope', 'CreateProjectFactory', '$location',
                                           function ($scope, CreateProjectFactory, $location) {
    $scope.bla = 'bla from controller';
	
    $scope.createNewProject = function(){
    	console.log('ProjectCreateController');
    	CreateProjectFactory.createNewUser($scope.project, function(data){
    		$scope.userNew = data;
    		
    	});
    	$location.path('/project-list');
    }
    
}]);


app.controller('ProjectCtrl', ['$scope', 'restservices', function ($scope, ProjectFactory, SharedService) {
    $scope.bla = 'bla from controller';
	
	/*$scope.user = new ProjectFactory();
	$scope.user.id = 12;
	$scope.user.firstName = '21212';
	$scope.user.lastName = 'sasasas';
	
	
    ProjectFactory.save($scope.user);*/
	
    console.log(restservices.getProjects());
	
    $scope.users = ProjectFactory.query1();
    
    
}]);

app.controller('DummyCtrl', ['$scope', 'DummyFactory', function ($scope, DummyFactory) {
    $scope.bla = 'bla from controller';
    DummyFactory.get({}, function (dummyFactory) {
        $scope.firstname = dummyFactory.firstName;
    })
}]);

app.controller('ConsultantCtrl', ['$scope', 'ConsultantFactory', '$location',
    function ($scope, ConsultantFactory, $location  ) {

        // callback for ng-click 'editUser':
        $scope.editUser = function (userId) {
            $location.path('/user-detail/' + userId);
        };

        // callback for ng-click 'deleteUser':
        $scope.deleteUser = function (userId) {
            console.log('deleteUser' + userId);
			$scope.deleteUsr = ConsultantFactory.deleteConsultants().delete({id: userId}, function(data) {
				console.log("deleteUser response" + data.consultants);
				$scope.users = data.consultants;
			});
			
        };

        // callback for ng-click 'createUser':
        $scope.createNewUser = function () {
            $location.path('/user-creation');
        };
        
        $scope.infoUser = function(userId){
        	$location.path('/user-info/' +userId);
        };
		
		/*$scope.user = new UserFactory();
		$scope.user.id = 12;
		$scope.user.firstName = 'Ranja';
		$scope.user.lastName = 'Sama';
		UserFactory.save($scope.user, function(data){
			console.log('User saved' + data.firstName);
		
		});*/
		
		//$http.get('/ngdemo/web/users').success(function(data) {
			//$scope.users = data;
		//});
		ConsultantFactory.getConsultants().query(function(data) {
        	
        	$scope.users = data;
        	
        });
		
    }]);

app.controller('ConsultantDetailCtrl', ['$scope', '$routeParams', 'UserFactory', '$location',
    function ($scope, $routeParams, UserFactory, $location) {

        // callback for ng-click 'updateUser':
        $scope.updateUser = function () {
            UserFactory.update($scope.user);
            $location.path('/user-list');
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/user-list');
        };

        $scope.user = UserFactory.show({id: $routeParams.id});
    }]);

app.controller('UserCreationCtrl', ['$scope', 'UsersFactory', '$location',
    function ($scope, UsersFactory, $location) {

        // callback for ng-click 'createNewUser':
        $scope.createNewUser = function () {
            UsersFactory.create($scope.user);
            $location.path('/user-list');
        }
    }]);
