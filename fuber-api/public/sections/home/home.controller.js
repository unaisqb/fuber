'use strict';

angular.module('demo-app.sections.home.controller', [])
  .controller('homeController', function (homeService) {
    (function (vm) {
      function loadCabs() {
        homeService.getCabs().then(function (cabs) {
          vm.cabs = cabs;
        });
      }
      loadCabs();
    }(this));
  });