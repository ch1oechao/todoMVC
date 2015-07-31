todo.controller('CateController', ['$scope', 'storageService', function($scope, storageService) {
    'use strict'
    //TODO

    //获取本地数据渲染页面
    $scope.cateList = storageService.getData('cates');
    $scope.listList = storageService.getData('lists');

    $scope.curList = $scope.listList[0];

    $scope.addPanelVisible = false;

    $scope.showAddPanel = function() {
      $scope.resetAddPanel();
      $scope.addPanelVisible = true;
    }

    $scope.hideAddPanel = function() {
      $scope.resetAddPanel();
      $scope.addPanelVisible = false;
    }

    $scope.resetAddPanel = function() {
      $scope.selectMain = {};
      $scope.newCateName = '';
    }

    $scope.newCateList = {};

    $scope.selectChange = function() {
      //获取主分类名称
      $scope.newCateList.cateMain = $scope.selectMain.category;
    }
    $scope.getNewCate = function() {
      //获取二级分类名称
      $scope.newCateList.newCateName = $scope.newCateName;
    }

    $scope.addNewCate = function() {
      if (!$scope.newCateName) {
        alert("请输入新分类名称!");
      } else {
        if (!!$scope.selectMain.category) {
          if(confirm("是否在 [" + $scope.newCateList.cateMain + "] 主分类下，添加 ["
                          + $scope.newCateList.newCateName + "] 新分类?")){
                            //TODO 插入数据，存入本地
                            storageService.setData('cates', {category: $scope.newCateList.cateMain});
                            storageService.setData('lists', {category: $scope.newCateList.cateMain,
                                                             taskList: $scope.newCateList.newCateName});
                            console.log("已添加!");
                          };
        } else {
          if(confirm("是否新增 [" + $scope.newCateList.newCateName + "] 主分类?")){
                            //TODO 插入数据，存入本地
                            storageService.setData('cates', {category: $scope.newCateList.newCateName});
                            console.log("已添加!");
                          };
        }
        $scope.cateList = storageService.getData('cates');
        $scope.listList = storageService.getData('lists');
        $scope.hideAddPanel();
      }
    }

    $scope.removeCate = function(e) {
      e.stopPropagation();
      if (e.target.tagName.toUpperCase() === "I") {
        $scope.curCateName = e.target.parentNode.parentNode.getAttribute("data-cate");
        $scope.curCate = storageService.getObj($scope.cateList, 'category', $scope.curCateName);
        var catePos = storageService.getPos('cates', 'category', $scope.curCate);

        if (confirm("确认删除 [ " + $scope.curCateName + " ] 主分类以及以下全部内容吗？")) {
          console.log("delete cate", $scope.curCateName, catePos);
          //TODO 删除分类 删除二级分类 删除以下任务
        }
      }

    };

    $scope.removeList = function(e) {
      e.stopPropagation();
      if (e.target.tagName.toUpperCase() === "I") {
        $scope.curListName = e.target.parentNode.getAttribute("data-list");
        $scope.curList = storageService.getObj($scope.listList, 'taskList', $scope.curListName);
        var listPos = storageService.getPos('lists', 'taskList', $scope.curList);

        if (confirm("确认删除 [ " + $scope.curListName + " ] 分类吗？")) {
          console.log("delete list", $scope.curListName, listPos);
          //TODO 删除二级分类 删除以下任务
        }
      }
    };

    $scope.seclectList = function(e) {
      e.stopPropagation();
      $scope.curList = storageService.getObj($scope.listList, 'taskList', this.$$watchers[0].last);
      var listPos = storageService.getPos('lists', 'taskList', $scope.curList);

      console.log("已选中", $scope.curList, listPos);
      //TODO 刷新列表视图
    }

}]);
