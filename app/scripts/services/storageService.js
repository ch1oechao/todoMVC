todo.factory('storageService', function(){
  'use strict'

  var todoService = {};

  todoService.getObj = function(arr, prop, val) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i][prop] === val) {
        return arr[i];
      }
    }
  }
  todoService.getPos = function(key, prop, val) {
    try{
        if (window.localStorage) {
            var storage = window.localStorage;
            if (storage.getItem(key)) {
              var arr = JSON.parse(storage.getItem(key));
              for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i][prop] === val[prop]) {
                  return i;
                }
              }
              return false;
            }
        }
    }
    catch (e) {
        console.log(e);
    }
  };
  todoService.isExist = function(key, prop, val) {
    try{
        if (window.localStorage) {
            var storage = window.localStorage;
            if (storage.getItem(key)) {
              var arr = JSON.parse(storage.getItem(key));
              for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i][prop] === val[prop]) {
                  return true;
                }
              }
              return false;
            }
        }
    }
    catch (e) {
        console.log(e);
    }
  };

  todoService.todoData = (function(){
    //创建默认分类、默认列表、默认任务对象
    var defaultCate = {
      category : "默认分类"
    };
    var defaultList = {
      category : defaultCate.category,
      taskList : "欢迎使用ToDo"
    };
    var defaultDetail = {
      id: 0,
      category : defaultCate.category,
      taskList : defaultList.taskList,
      title: "Welcome to ToDo",
      time: new Date(2015, 0, 1),
      content: 'Nice to meet U !  欢迎使用 ToDo 应用 ~ (๑•̀ㅂ•́)و✧',
      isDone: true
    };

    var task1 = {
      id: 1,
      category : defaultCate.category,
      taskList : defaultList.taskList,
      title: "ToDo Test",
      time: new Date(2015, 1, 1),
      content: 'For Test !!!',
      isDone: true
    }

    return {
      cates: [defaultCate],
      lists: [defaultList],
      tasks: [defaultDetail, task1]
    }
  })();

  todoService.getData = function(key){
    try{
        //监测浏览器是否支持localStorage
        if (window.localStorage) {
            var storage = window.localStorage;
            //若浏览器之前没有储存key值，则将初始化对象数组存入localStorage，再返回该key值
            if (!storage.getItem(key)) {
                switch (key){
                    case "cates":
                        storage.setItem("cates", JSON.stringify(this.todoData.cates));
                        return JSON.parse(storage.getItem("cates"));
                        break;
                    case "lists":
                        storage.setItem("lists", JSON.stringify(this.todoData.lists));
                        return JSON.parse(storage.getItem("lists"));
                        break;
                    case "tasks":
                        storage.setItem("tasks", JSON.stringify(this.todoData.tasks));
                        return JSON.parse(storage.getItem("tasks"));
                }
            }
            //若浏览器里已存在传递的key值，则直接返回key值对象
            return JSON.parse(storage.getItem(key));
        }
    }
    catch (e) {
        console.log(e);
    }
  };

  todoService.setData = function(key, val) {
      try{
          if (window.localStorage) {
              var storage = window.localStorage;
              if (storage.getItem(key)) {
                  switch (key) {
                      case "cates":
                          if (!todoService.isExist(key, 'category', val)) {
                            this.todoData.cates.push(val);
                            storage.setItem("cates", JSON.stringify(this.todoData.cates));
                          }
                          break;
                      case "lists":
                          if (!todoService.isExist(key, 'taskList', val)) {
                            this.todoData.lists.push(val);
                            storage.setItem("lists", JSON.stringify(this.todoData.lists));
                          }
                          break;
                      case "tasks":
                          if (!todoService.isExist(key, 'title', val)) {
                            this.todoData.tasks.push(val);
                            storage.setItem("tasks", JSON.stringify(this.todoData.tasks));
                          }
                          break;
                  }
              }
          }
      }
      catch (e) {
          console.log(e);
      }
  };
  //
  // todoService.updateData = function(cates, lists, tasks) {
  //     //更新本地分类数据
  //     todoService.setData("cates", cates);
  //     //更新本地列表数据
  //     todoService.setData("lists", lists);
  //     //更新本地任务数据
  //     todoService.setData("tasks", tasks);
  // };

  return todoService;

});
