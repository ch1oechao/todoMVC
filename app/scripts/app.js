define(['angular', 'angular-route'], function(angular) {
  return angular.module('todoapp', ['ngRoute'])
           .config(function ($routeProvider) {
             'use strict';
             var routeConfig = {
               controller: 'controllers',
               templateUrl: 'index.html'
             };

             $routeProvider
               .when('/', routeConfig)
               .when('/:status', routeConfig)
               .otherwise({
                 redirectTo: '/'
               });
           });
})
