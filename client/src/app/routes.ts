/// <reference path="app.d.ts" />

module Tomedescontos {
	app.config(function($stateProvider, $urlRouterProvider){
       // $locationProvider.html5Mode({ enabled: true, requireBase: false });
        $urlRouterProvider.otherwise('/promocoes');
        
        $stateProvider
            // .state('index', {
            //     url: "/home",
            //     templateUrl: "assets/pages/templates/main.tpl.html"
            // })
            .state('promocoes', {
                url: "/promocoes",
                templateUrl: "assets/pages/templates/promolist.tpl.html"
            })
            .state('detail', {
                url: "/promocao/:title",
                templateUrl: "assets/pages/templates/promoDetail.tpl.html"
            });
    });
    
}