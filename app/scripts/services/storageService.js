todo.factory('storageService', function(){
  'use strict'

  var Category = function(obj) {
      this.category = obj.category;

      return {category: this.category};
  };

  Category.prototype = {
      category : "默认分类"
  };

  var TaskList = function(obj) {
      this.category = obj.category;
      this.taskList = obj.taskList;

      return {category: this.category, taskList: this.taskList};
  };

  TaskList.prototype = {
      category : Category.prototype.category,
      taskList : "欢迎使用ToDo"
  };

  var TaskDetail = function(obj) {
      this.id = 0;
      this.cateList = obj.cateList;
      this.title = obj.title;
      this.time = obj.time;
      this.content = obj.content;
      this.isDone = obj.isDone;

      return {
          id: this.id,
          cateList: this.cateList,
          title: this.title,
          time: this.time,
          content: this.content,
          isDone: this.isDone
      };
  };

  TaskDetail.prototype = {
      id: 0,
      cateList: TaskList.prototype,
      title: "Welcome to ToDo",
      time: new Date(2015, 0, 1),
      content: 'Nice to meet U !  欢迎使用 ToDo 应用 ~ (๑•̀ㅂ•́)و✧',
      isDone: true
  };

  var todoData = (function(){
    //创建默认分类、默认列表、默认任务对象
    var defaultCate = Category.prototype;
    var defaultList = TaskList.prototype;
    var defaultDetail = TaskDetail.prototype;

    return {
      cates: [defaultCate],
      lists: [defaultList],
      tasks: [defaultDetail]
    }
  })();

  var todoService = {};

  todoService.getData = function(key){
    try{
        //监测浏览器是否支持localStorage
        if (window.localStorage) {
            var storage = window.localStorage;
            //若浏览器之前没有储存key值，则将初始化对象数组存入localStorage，再返回该key值
            if (!storage.getItem(key)) {
                switch (key){
                    case "cates":
                        storage.setItem("cates", JSON.stringify(todoData.cates));
                        return JSON.parse(storage.getItem("cates"));
                        break;
                    case "lists":
                        storage.setItem("lists", JSON.stringify(todoData.lists));
                        return JSON.parse(storage.getItem("lists"));
                        break;
                    case "tasks":
                        storage.setItem("tasks", JSON.stringify(todoData.tasks));
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
                          storage.setItem("cates", JSON.stringify(val));
                          break;
                      case "lists":
                          storage.setItem("lists", JSON.stringify(val));
                          break;
                      case "tasks":
                          storage.setItem("tasks", JSON.stringify(val));
                  }
              }
          }
      }
      catch (e) {
          console.log(e);
      }
  };

  todoService.updateData = function(cates, lists, tasks) {
      //更新本地分类数据
      todoService.setData("cates", cates);
      //更新本地列表数据
      todoService.setData("lists", lists);
      //更新本地任务数据
      todoService.setData("tasks", tasks);
  };

  return todoService;

});
