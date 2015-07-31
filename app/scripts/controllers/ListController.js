todo.controller('ListController', ['$scope', 'storageService',function($scope, storageService) {
    'use strict'
    //TODO

    //获取本地数据
    $scope.taskList = storageService.getData('tasks');

    //编辑状态
    $scope.editState = false;
    //查看状态
    $scope.viewState = true;

    //添加新任务
    $scope.addNewTask = function() {
      $scope.editState = true;
      $scope.viewState = false;
      //任务内容置空
      $scope.curTask = {};
    }
    //改变当前任务id
    $scope.changeTaskId = function(id) {
      $scope.curId = id;
      $scope.curTask = $scope.taskList[id];
      $scope.curTask.time = new Date($scope.curTask.time);
    };

}]);
