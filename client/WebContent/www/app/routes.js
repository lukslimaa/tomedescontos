/// <reference path="app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQ0FBaUM7QUFFakMsSUFBTyxhQUFhLENBY25CO0FBZEQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVMsY0FBYyxFQUFFLGtCQUFrQjtRQUMvQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkMsY0FBYzthQUNULEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDWixHQUFHLEVBQUUsT0FBTztZQUNaLFdBQVcsRUFBRSxzQ0FBc0M7U0FDdEQsQ0FBQzthQUNELEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDWixHQUFHLEVBQUUsWUFBWTtZQUNqQixXQUFXLEVBQUUsMkNBQTJDO1NBQzNELENBQUMsQ0FBQTtJQUNWLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxFQWRNLGFBQWEsS0FBYixhQUFhLFFBY25CIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJhcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblx0YXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2luZGV4Jyk7XG4gICAgICAgIFxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdpbmRleCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6IFwiL2hvbWVcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhc3NldHMvcGFnZXMvdGVtcGxhdGVzL21haW4udHBsLmh0bWxcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgncHJvbW8nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiBcIi9wcm9tb2NvZXNcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhc3NldHMvcGFnZXMvdGVtcGxhdGVzL3Byb21vbGlzdC50cGwuaHRtbFwiXG4gICAgICAgICAgICB9KVxuICAgIH0pXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
