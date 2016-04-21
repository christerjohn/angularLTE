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
				// 'datatables',
				'satellizer'

			])
  		.config(appConfig);

  	appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$authProvider'];

  	function appConfig($stateProvider, $urlRouterProvider, $authProvider) {

		$stateProvider
			.state('login', {
		        url: '/login',
		        templateUrl: 'app/modules/user/auth/login.html',
		        controller: 'authController',
		        resolve: {
		          skipIfLoggedIn: skipIfLoggedIn
		        }
		    })
		    .state('logout', {
		        url: '/logout',
		        template: null,
		        controller: 'logoutController'
		    })
		    .state('app', {
		        url: '/app',
		        controller: 'homeController',
		        abstract: true,
		        templateUrl: 'app/modules/core/core.html', //side nav and top nav
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })
		     .state('app.createUser', {
		        url: '/user/create',
		        templateUrl: 'app/modules/user/new/create.html',
		        controller: 'createUserController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })
		    .state('app.user', {
		        url: '/user',
		        templateUrl: 'app/modules/user/user.html',
		        controller: 'accountController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })
		    .state('app.dashboard', {
		        url: '/dashboard',
		        templateUrl: 'app/modules/dashboard/dashboard.html',
		        controller: 'dashboardController',
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

		    .state('app.create', {
		        url: '/household/create',
		        templateUrl: 'app/modules/household/householdCreate.html',
		        controller: 'householdCreateController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		    .state('app.householdDetails', {
		        url: '/household/householdDetails',
		        templateUrl: 'app/modules/household/householdDetails/householdDetails.html',
		        controller: 'householdController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		    .state('app.family', {
		        url: '/household/family',
		        templateUrl: 'app/modules/household/householdDetails/family/family.html',
		        controller: 'familyController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		    .state('app.resident', {
		        url: '/household/resident',
		        templateUrl: 'app/modules/household/householdDetails/family/resident/resident.html',
		        controller: 'residentController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		    .state('app.barangay', {
		        url: '/barangay',
		        templateUrl: 'app/modules/barangay/barangay.html',
		        controller: 'barangayController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })

		      .state('app.purok', {
		        url: '/barangay/purok',
		        templateUrl: 'app/modules/barangay/purok/purok.html',
		        controller: 'purokController',
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
		        templateUrl: 'app/modules/province/municipality/municipality.html',
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