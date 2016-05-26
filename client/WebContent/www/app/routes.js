/// <reference path="app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('promo', {
            url: "/promocoes",
            templateUrl: "assets/pages/templates/promolist.tpl.html"
        });
    });
})(Tomedescontos || (Tomedescontos = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQ0FBaUM7QUFFakMsSUFBTyxhQUFhLENBVW5CO0FBVkQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVMsY0FBYyxFQUFFLGtCQUFrQjtRQUMvQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkMsY0FBYzthQUNULEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDWixHQUFHLEVBQUUsWUFBWTtZQUNqQixXQUFXLEVBQUUsMkNBQTJDO1NBQzNELENBQUMsQ0FBQTtJQUNWLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxFQVZNLGFBQWEsS0FBYixhQUFhLFFBVW5CIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJhcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblx0YXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2luZGV4Jyk7XG4gICAgICAgIFxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdwcm9tbycsIHtcbiAgICAgICAgICAgICAgICB1cmw6IFwiL3Byb21vY29lc1wiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFzc2V0cy9wYWdlcy90ZW1wbGF0ZXMvcHJvbW9saXN0LnRwbC5odG1sXCJcbiAgICAgICAgICAgIH0pXG4gICAgfSlcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
