todo.factory('storageService', function(){
  'use strict'

  var todoService = {};

  //找到数组中相对应prop值的数组对象
  todoService.getObj = function(arr, prop, val) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i][prop] === val) {
        return arr[i];
      }
    }
  }
  //获取当前数组中相对应prop值的数组对象的位置
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

  //判断当前数组中是否还有相对应prop值的数组对象
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

  //重置任务数组中卫任务的id顺序
  todoService.orderTasks = function(arr) {
      for (var i = 0, len = arr.length; i < len; i++) {
        arr[i].id = i;
      }
      return arr;
  }


  //初始化测试数据
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
    };


    return {
      cates: [defaultCate],
      lists: [defaultList],
      tasks: todoService.orderTasks([defaultDetail, task1])
    }
  })();

  //从本地获取数据
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


  //从本地更新数据
  todoService.setData = function(key, val) {
      try{
          if (window.localStorage) {
              var storage = window.localStorage;
              if (storage.getItem(key)) {
                  switch (key) {
                      case "cates":
                          if (!todoService.isExist(key, 'category', val)) {
                            var cates = todoService.getData('cates')
                            cates.push(val);
                            storage.setItem("cates", JSON.stringify(cates));
                          }
                          break;
                      case "lists":
                          if (!todoService.isExist(key, 'taskList', val)) {
                            var lists = todoService.getData('lists');
                            lists.push(val);
                            storage.setItem("lists", JSON.stringify(lists));
                          }
                          break;
                      case "tasks":
                          var tasks = todoService.getData('tasks');
                          if (todoService.isExist(key, 'id', val)) {
                            var pos = todoService.getPos(key, 'id', val);
                            tasks.splice(pos, 1, val);
                          } else {
                            tasks.push(val);
                          }
                          todoService.orderTasks(tasks);
                          storage.setItem("tasks", JSON.stringify(tasks));
                          break;
                  }
              }
          }
      }
      catch (e) {
          console.log(e);
      }
  };
  
  return todoService;

});
