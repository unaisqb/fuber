'use strict';

angular.module('demo-app.core.router.service', [])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'sections/home/home.html',
        controller: 'homeController as homeContrlr'
      })
  })
  .factory('routerService', function ($state, $stateParams) {
    var service = {
      getParam: getParam,
      go: go
    };

    function getParam(name) {
      return $stateParams[name];
    }

    function go(state, params) {
      $state.go(state, params);
    }

    return service;
  });
