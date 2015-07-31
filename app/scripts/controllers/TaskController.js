todo.controller('TaskController', ['$scope', 'storageService', function($scope, storageService) {
    'use strict'
    //TODO
    $scope.curId = 0;
    $scope.taskList = storageService.getData('tasks');
    $scope.curTask = $scope.taskList[$scope.curId];

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
