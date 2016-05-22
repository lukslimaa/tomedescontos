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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21vTGlzdC9wcm9tb0xpc3QuY3RyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQztBQUVwQyxJQUFPLGFBQWEsQ0FvQm5CO0FBcEJELFdBQU8sYUFBYSxFQUFDLENBQUM7SUFFbEI7UUFLSSx5QkFBb0IsTUFBaUIsRUFDekIsS0FBc0IsRUFDdEIsRUFBZ0IsRUFDaEIsWUFBWSxFQUNaLFVBQTBDLEVBQzFDLFlBQTBCO1lBVjFDLGlCQWlCQztZQVp1QixXQUFNLEdBQU4sTUFBTSxDQUFXO1lBQ3pCLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQ3RCLE9BQUUsR0FBRixFQUFFLENBQWM7WUFDaEIsaUJBQVksR0FBWixZQUFZLENBQUE7WUFDWixlQUFVLEdBQVYsVUFBVSxDQUFnQztZQUMxQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztZQUdsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ3BDLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FqQkEsQUFpQkMsSUFBQTtJQWpCWSw2QkFBZSxrQkFpQjNCLENBQUE7QUFDTCxDQUFDLEVBcEJNLGFBQWEsS0FBYixhQUFhLFFBb0JuQjtBQUNELEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwcm9tb0xpc3QvcHJvbW9MaXN0LmN0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQcm9tb0NvbnRyb2xsZXIge1xuXG4gICAgICAgIHByaXZhdGUgcHJvbW90aW9uczogYW55O1xuICAgICAgICBwcml2YXRlIGRhdGU6IGFueTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLCBcbiAgICAgICAgICAgIHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSwgXG4gICAgICAgICAgICBwcml2YXRlICRxOiBuZy5JUVNlcnZpY2UsXG4gICAgICAgICAgICBwcml2YXRlICRzdGF0ZVBhcmFtcywgXG4gICAgICAgICAgICBwcml2YXRlICR0cmFuc2xhdGU6IG5nLnRyYW5zbGF0ZS5JVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgcHJvbW9TZXJ2aWNlOiBQcm9tb1NlcnZpY2UpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnByb21vU2VydmljZS5wZXNxdWlzYXIoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9tb3Rpb25zID0gZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuYXBwLmNvbnRyb2xsZXIoJ1Byb21vQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRodHRwJywgJyRxJywgJyRzdGF0ZVBhcmFtcycsICckdHJhbnNsYXRlJywgJ1Byb21vU2VydmljZScsIFRvbWVkZXNjb250b3MuUHJvbW9Db250cm9sbGVyXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
