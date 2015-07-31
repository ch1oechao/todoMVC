todo.controller('ListController', ['$scope', 'storageService',function($scope, storageService) {
    'use strict'
    //TODO
    $scope.taskList = storageService.getData('tasks');

    $scope.editState = false;
    $scope.viewState = true;

    $scope.addNewTask = function() {
      $scope.editState = true;
      $scope.viewState = false;
      $scope.curTask = {};
    }
    $scope.changeTaskId = function(id) {
      // $scope.curId = tasks.id;
      $scope.curTask = $scope.taskList[id];
      console.log($scope.curTask);
    };

    $scope.isId = function() {
      // return this.tasks.id === $scope.curId;
    }
}]);
