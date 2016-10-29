/// <reference path="app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/promocoes');
        $stateProvider
            .state('promo', {
            url: "/promocoes",
            templateUrl: "assets/pages/templates/promolist.tpl.html"
        });
    });
})(Tomedescontos || (Tomedescontos = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQ0FBaUM7QUFFakMsSUFBTyxhQUFhLENBY25CO0FBZEQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVMsY0FBYyxFQUFFLGtCQUFrQjtRQUMvQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFM0MsY0FBYzthQUtULEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDWixHQUFHLEVBQUUsWUFBWTtZQUNqQixXQUFXLEVBQUUsMkNBQTJDO1NBQzNELENBQUMsQ0FBQTtJQUNWLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxFQWRNLGFBQWEsS0FBYixhQUFhLFFBY25CIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJhcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblx0YXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3Byb21vY29lcycpO1xuICAgICAgICBcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC8vIC5zdGF0ZSgnaW5kZXgnLCB7XG4gICAgICAgICAgICAvLyAgICAgdXJsOiBcIi9ob21lXCIsXG4gICAgICAgICAgICAvLyAgICAgdGVtcGxhdGVVcmw6IFwiYXNzZXRzL3BhZ2VzL3RlbXBsYXRlcy9tYWluLnRwbC5odG1sXCJcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3Byb21vJywge1xuICAgICAgICAgICAgICAgIHVybDogXCIvcHJvbW9jb2VzXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXNzZXRzL3BhZ2VzL3RlbXBsYXRlcy9wcm9tb2xpc3QudHBsLmh0bWxcIlxuICAgICAgICAgICAgfSlcbiAgICB9KVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
