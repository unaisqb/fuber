'use strict';

angular.module('demo-app.sections.home.service', [])
  .factory('homeService', function ($http) {

    function getCabs() {
      return $http.get('/cab').then(function (response) {
        return response.data.records;
      });
    }

    return {
      getCabs: getCabs
    };
  });