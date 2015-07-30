todo.controller('ListController', ['$scope', 'storageService',function($scope, storageService) {
    'use strict'
    //TODO
    $scope.taskList = storageService.getData('tasks');



    $scope.editState = false;
    $scope.viewState = true;

    $scope.addNewTask = function() {
      $scope.editState = true;
      $scope.viewState = false;
    }
}]);
