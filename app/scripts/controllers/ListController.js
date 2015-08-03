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

      //任务内容置空
      if (confirm("确认在 ["
                  + $scope.curList.category + "] 分类的 ["
                  + $scope.curList.taskList + "] 列表下建立任务吗?")) {
          //TODO 新建任务
          // console.log("新建任务啦");
          $scope.editState = true;
          $scope.viewState = false;
          $scope.curTask = {};
      }
    }
    //改变当前任务id
    $scope.changeTaskId = function(id) {
      $scope.curId = id;
      $scope.curTask = $scope.taskList[id];
      $scope.curTask.time = new Date($scope.curTask.time);
    };

    $scope.$watch($scope.taskList, $scope.updateTask);

}]);
