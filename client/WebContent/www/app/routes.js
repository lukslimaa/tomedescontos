/// <reference path="app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('index', {
            url: "/home",
            templateUrl: "assets/pages/templates/main.tpl.html"
        })
            .state('promo', {
            url: "/promocoes",
            templateUrl: "assets/pages/templates/promolist.tpl.html"
        });
    });
})(Tomedescontos || (Tomedescontos = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQ0FBaUM7QUFFakMsSUFBTyxhQUFhLENBY25CO0FBZEQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVMsY0FBYyxFQUFFLGtCQUFrQjtRQUMvQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdEMsY0FBYzthQUNULEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDWixHQUFHLEVBQUUsT0FBTztZQUNaLFdBQVcsRUFBRSxzQ0FBc0M7U0FDdEQsQ0FBQzthQUNELEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDWixHQUFHLEVBQUUsWUFBWTtZQUNqQixXQUFXLEVBQUUsMkNBQTJDO1NBQzNELENBQUMsQ0FBQTtJQUNWLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxFQWRNLGFBQWEsS0FBYixhQUFhLFFBY25CIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJhcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblx0YXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2hvbWUnKTtcbiAgICAgICAgXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2luZGV4Jywge1xuICAgICAgICAgICAgICAgIHVybDogXCIvaG9tZVwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFzc2V0cy9wYWdlcy90ZW1wbGF0ZXMvbWFpbi50cGwuaHRtbFwiXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdwcm9tbycsIHtcbiAgICAgICAgICAgICAgICB1cmw6IFwiL3Byb21vY29lc1wiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFzc2V0cy9wYWdlcy90ZW1wbGF0ZXMvcHJvbW9saXN0LnRwbC5odG1sXCJcbiAgICAgICAgICAgIH0pXG4gICAgfSlcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
