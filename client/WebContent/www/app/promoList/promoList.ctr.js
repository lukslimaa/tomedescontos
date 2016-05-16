/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var PromoController = (function () {
        function PromoController($scope, $http, $q, $stateParams, $translate, promoService) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$q = $q;
            this.$stateParams = $stateParams;
            this.$translate = $translate;
            this.promoService = promoService;
            this.promoService.pesquisar().then(function (data) {
                _this.promotions = data;
            });
        }
        return PromoController;
    }());
    Tomedescontos.PromoController = PromoController;
})(Tomedescontos || (Tomedescontos = {}));
app.controller('PromoController', ['$scope', '$http', '$q', '$stateParams', '$translate', 'PromoService', Tomedescontos.PromoController]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21vTGlzdC9wcm9tb0xpc3QuY3RyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQztBQUVwQyxJQUFPLGFBQWEsQ0FtQm5CO0FBbkJELFdBQU8sYUFBYSxFQUFDLENBQUM7SUFFbEI7UUFJSSx5QkFBb0IsTUFBaUIsRUFDekIsS0FBc0IsRUFDdEIsRUFBZ0IsRUFDaEIsWUFBWSxFQUNaLFVBQTBDLEVBQzFDLFlBQTBCO1lBVDFDLGlCQWdCQztZQVp1QixXQUFNLEdBQU4sTUFBTSxDQUFXO1lBQ3pCLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQ3RCLE9BQUUsR0FBRixFQUFFLENBQWM7WUFDaEIsaUJBQVksR0FBWixZQUFZLENBQUE7WUFDWixlQUFVLEdBQVYsVUFBVSxDQUFnQztZQUMxQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztZQUdsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ3BDLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FoQkEsQUFnQkMsSUFBQTtJQWhCWSw2QkFBZSxrQkFnQjNCLENBQUE7QUFDTCxDQUFDLEVBbkJNLGFBQWEsS0FBYixhQUFhLFFBbUJuQjtBQUNELEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwcm9tb0xpc3QvcHJvbW9MaXN0LmN0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQcm9tb0NvbnRyb2xsZXIge1xuXG4gICAgICAgIHByaXZhdGUgcHJvbW90aW9uczogYW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsIFxuICAgICAgICAgICAgcHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLCBcbiAgICAgICAgICAgIHByaXZhdGUgJHE6IG5nLklRU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgJHN0YXRlUGFyYW1zLCBcbiAgICAgICAgICAgIHByaXZhdGUgJHRyYW5zbGF0ZTogbmcudHJhbnNsYXRlLklUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSBwcm9tb1NlcnZpY2U6IFByb21vU2VydmljZSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMucHJvbW9TZXJ2aWNlLnBlc3F1aXNhcigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb21vdGlvbnMgPSBkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5hcHAuY29udHJvbGxlcignUHJvbW9Db250cm9sbGVyJywgWyckc2NvcGUnLCAnJGh0dHAnLCAnJHEnLCAnJHN0YXRlUGFyYW1zJywgJyR0cmFuc2xhdGUnLCAnUHJvbW9TZXJ2aWNlJywgVG9tZWRlc2NvbnRvcy5Qcm9tb0NvbnRyb2xsZXJdKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
