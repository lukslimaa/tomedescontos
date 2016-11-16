/// <reference path="app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    app.config(function ($stateProvider, $urlRouterProvider) {
        // $locationProvider.html5Mode({ enabled: true, requireBase: false });
        $urlRouterProvider.otherwise('/promocoes');
        $stateProvider
            .state('promocoes', {
            url: "/promocoes",
            templateUrl: "assets/pages/templates/promolist.tpl.html"
        })
            .state('detail', {
            url: "/promocao/:title",
            templateUrl: "assets/pages/templates/promoDetail.tpl.html"
        });
    });
})(Tomedescontos || (Tomedescontos = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQ0FBaUM7QUFFakMsSUFBTyxhQUFhLENBb0JuQjtBQXBCRCxXQUFPLGFBQWEsRUFBQyxDQUFDO0lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBUyxjQUFjLEVBQUUsa0JBQWtCO1FBQ2hELHNFQUFzRTtRQUNyRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFM0MsY0FBYzthQUtULEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDaEIsR0FBRyxFQUFFLFlBQVk7WUFDakIsV0FBVyxFQUFFLDJDQUEyQztTQUMzRCxDQUFDO2FBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNiLEdBQUcsRUFBRSxrQkFBa0I7WUFDdkIsV0FBVyxFQUFFLDZDQUE2QztTQUM3RCxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUVQLENBQUMsRUFwQk0sYUFBYSxLQUFiLGFBQWEsUUFvQm5CIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJhcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblx0YXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcbiAgICAgICAvLyAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoeyBlbmFibGVkOiB0cnVlLCByZXF1aXJlQmFzZTogZmFsc2UgfSk7XG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9wcm9tb2NvZXMnKTtcbiAgICAgICAgXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAvLyAuc3RhdGUoJ2luZGV4Jywge1xuICAgICAgICAgICAgLy8gICAgIHVybDogXCIvaG9tZVwiLFxuICAgICAgICAgICAgLy8gICAgIHRlbXBsYXRlVXJsOiBcImFzc2V0cy9wYWdlcy90ZW1wbGF0ZXMvbWFpbi50cGwuaHRtbFwiXG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgLnN0YXRlKCdwcm9tb2NvZXMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiBcIi9wcm9tb2NvZXNcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhc3NldHMvcGFnZXMvdGVtcGxhdGVzL3Byb21vbGlzdC50cGwuaHRtbFwiXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdkZXRhaWwnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiBcIi9wcm9tb2Nhby86dGl0bGVcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhc3NldHMvcGFnZXMvdGVtcGxhdGVzL3Byb21vRGV0YWlsLnRwbC5odG1sXCJcbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
