todo.controller('CateController', ['$scope', 'storageService', function($scope, storageService) {
    'use strict'
    //TODO
    $scope.cateList = storageService.getData('cates');
    $scope.listList = storageService.getData('lists');

    $scope.addPanelVisible = false;

    $scope.showAddPanel = function() {
      $scope.addPanelVisible = true;
    }

    $scope.hideAddPanel = function() {
      $scope.addPanelVisible = false;
    }

    $scope.addNewCate = function() {
      $scope.showAddPanel();
    }

}]);
