(function() {
	'use strict';

	angular
		.module('app', 
			[
				'ngResource', 
				'ngMessages', 
				'ngAnimate', 
				'toastr', 
				'ui.router',
				'satellizer',
			])
  		.config(appConfig);

  	appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$authProvider'];

  	function appConfig($stateProvider, $urlRouterProvider, $authProvider) {

		$stateProvider
		    .state('app', {
		        url: '/app',
		        controller: 'homeController',
		        abstract: true,
		        templateUrl: 'app/modules/core/core.html', //side nav and top nav
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })
		    .state('login', {
		        url: '/login',
		        templateUrl: 'app/modules/user/auth/login.html',
		        controller: 'authController',
		        resolve: {
		          skipIfLoggedIn: skipIfLoggedIn
		        }
		    })
		      /*.state('signup', {
		        url: '/signup',
		        templateUrl: 'partials/signup.html',
		        controller: '',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })*/
		    .state('logout', {
		        url: '/logout',
		        template: null,
		        controller: 'logoutController'
		    })
		    .state('app.user', {
		        url: '/user',
		        templateUrl: 'app/modules/user/user.html',
		        controller: 'ProfileCtrl',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })
		    .state('app.dashboard', {
		        url: '/dashboard',
		        templateUrl: 'app/modules/dashboard/dashboard.html',
		        controller: 'dashboradController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		    .state('app.household', {
		        url: '/household',
		        templateUrl: 'app/modules/household/household.html',
		        controller: 'householdController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		    .state('app.barangay', {
		        url: '/household',
		        templateUrl: 'app/modules/barangay/barangay.html',
		        controller: 'barangayController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		    .state('app.province', {
		        url: '/province',
		        templateUrl: 'app/modules/province/province.html',
		        controller: 'provinceController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		    .state('app.municipality', {
		        url: '/province/municipality',
		        templateUrl: 'app/modules/province/municipality.html',
		        controller: 'municipalityController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		    .state('app.mapflood', {
		        url: '/mapflood',
		        templateUrl: 'app/modules/mapflood/mapflood.html',
		        controller: 'mapfloodController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		    .state('app.mappopulation', {
		        url: '/mappopulation',
		        templateUrl: 'app/modules/mappopulation/mappopulation.html',
		        controller: 'mappopulationController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		    .state('app.report', {
		        url: '/report',
		        templateUrl: 'app/modules/report/report.html',
		        controller: 'reportController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    });

		$authProvider.loginUrl = '/api/authenticate';

	    $urlRouterProvider.otherwise(function($injector) {
	      var $state = $injector.get('$state');
	      $state.go('app.dashboard');
	    });



	    function skipIfLoggedIn($q, $auth) {
	      var deferred = $q.defer();
	      if ($auth.isAuthenticated()) {
	        deferred.reject();
	      } else {
	        deferred.resolve();
	      }
	      return deferred.promise;
	    }

	    function loginRequired($q, $location, $auth) {
	      var deferred = $q.defer();
	      if ($auth.isAuthenticated()) {
	        deferred.resolve();
	      } else {
	        $location.path('/login');
	      }
	      return deferred.promise;
	    }
	}

})();