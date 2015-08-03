todo.controller('TaskController', ['$scope', 'storageService', function($scope, storageService) {
    'use strict'
    //TODO

    //初始化当前任务id
    $scope.curId = 0;
    //获取本地数据
    $scope.taskList = storageService.getData('tasks');
    //获取当前任务
    $scope.curTask = $scope.taskList[$scope.curId];
    $scope.curTask.time = new Date($scope.curTask.time);

    //编辑状态
    $scope.editState = false;
    //查看状态
    $scope.viewState = true;

    //编辑任务
    $scope.editTask = function() {
      $scope.editState = true;
      $scope.viewState = false;
      $scope.inputTask = $scope.curTask;
      //TODO 将显示数据转为表单数据
    }
    //更新任务
    $scope.updateTask = function() {
      $scope.editState = false;
      $scope.viewState = true;
      //TODO 更新本地数据
      if (!!$scope.curTask.id) {
        //修改任务
        var pos = storageService.getPos('tasks', 'id', $scope.curTask);
        storageService.setData('tasks', $scope.taskList[pos]);
      } else {
        //新建任务
        $scope.inputTask.category = $scope.curList.category;
        $scope.inputTask.taskList = $scope.curList.taskList;
        $scope.inputTask.isDone = false;
        $scope.inputTask.id = storageService.getData('tasks').length;
        //存入本地
        storageService.setData('tasks', $scope.inputTask);
        $scope.curTask = $scope.inputTask;

        $scope.taskList = storageService.getData("tasks");
      }
    }

}]);
