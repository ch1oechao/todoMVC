var todo = angular.module('todoApp', ['ngRoute'])
           .config(function ($routeProvider) {
             'use strict'

             $routeProvider
               .when('/', {
                 templateUrl: 'views/main.html',
                 controller: 'MainController',
               })
               .otherwise({
                 redirectTo: '/'
               });
           });
