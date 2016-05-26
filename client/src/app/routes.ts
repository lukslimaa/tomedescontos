/// <reference path="app.d.ts" />

module Tomedescontos {
	app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/index');
        
        $stateProvider
            .state('promo', {
                url: "/promocoes",
                templateUrl: "assets/pages/templates/promolist.tpl.html"
            })
    })
}