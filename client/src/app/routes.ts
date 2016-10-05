/// <reference path="app.d.ts" />

module Tomedescontos {
	app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/promocoes');
        
        $stateProvider
            // .state('index', {
            //     url: "/home",
            //     templateUrl: "assets/pages/templates/main.tpl.html"
            // })
            .state('promo', {
                url: "/promocoes",
                templateUrl: "assets/pages/templates/promolist.tpl.html"
            })
    })
}