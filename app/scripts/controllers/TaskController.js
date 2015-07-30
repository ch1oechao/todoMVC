todo.controller('TaskController', ['$scope', 'storageService', function($scope, storageService) {
    'use strict'
    //TODO
    $scope.taskList = storageService.getData('tasks');
    $scope.curTask = $scope.taskList[0];

    $scope.editState = false;
    $scope.viewState = true;

    $scope.editTask = function() {
      $scope.editState = true;
      $scope.viewState = false;
    }
    $scope.viewTask = function() {
      $scope.editState = false;
      $scope.viewState = true;
    }
    
}]);
