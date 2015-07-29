require.config({
  paths: {
    'angular': '../vender/angular.min',
    'angular-route': '../verder/angular-route.min'
  },
  shim: {
    'angular' : {
      exports: 'angular'
    },
    'angular-route' : {
      deps: ['angular'],
      exports: 'angular-route'
    }
  }
})
