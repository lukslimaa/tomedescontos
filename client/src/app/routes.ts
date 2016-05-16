/// <reference path="app.d.ts" />

module Tomedescontos {
	app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/index');
        
        $stateProvider
            .state('state1', {
                url: "/index2",
                templateUrl: "assets/pages/templates/promolist.tpl.html"
            })
    })
}