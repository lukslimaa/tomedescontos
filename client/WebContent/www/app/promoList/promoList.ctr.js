/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var PromoController = (function () {
        function PromoController($scope, $http, $timeout, $interval, $q, $translate, promoService) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$timeout = $timeout;
            this.$interval = $interval;
            this.$q = $q;
            this.$translate = $translate;
            this.promoService = promoService;
            this.promoService.pesquisar().then(function (data) {
                _this.promotions = data;
            });
            this.updatePromoList();
        }
        PromoController.prototype.updatePromoList = function () {
            var _this = this;
            this.$interval(function () {
                _this.promoService.pesquisar().then(function (data) {
                    _this.promotions = data;
                });
            }, 300000);
        };
        return PromoController;
    }());
    Tomedescontos.PromoController = PromoController;
})(Tomedescontos || (Tomedescontos = {}));
app.controller('PromoController', ['$scope', '$http', '$timeout', '$interval', '$q', '$translate', 'PromoService', Tomedescontos.PromoController]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21vTGlzdC9wcm9tb0xpc3QuY3RyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQztBQUVwQyxJQUFPLGFBQWEsQ0FrQ25CO0FBbENELFdBQU8sYUFBYSxFQUFDLENBQUM7SUFFbEI7UUFPSSx5QkFBb0IsTUFBaUIsRUFDekIsS0FBc0IsRUFDdEIsUUFBNEIsRUFDNUIsU0FBOEIsRUFDOUIsRUFBZ0IsRUFDaEIsVUFBMEMsRUFDMUMsWUFBMEI7WUFiMUMsaUJBK0JDO1lBeEJ1QixXQUFNLEdBQU4sTUFBTSxDQUFXO1lBQ3pCLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQ3RCLGFBQVEsR0FBUixRQUFRLENBQW9CO1lBQzVCLGNBQVMsR0FBVCxTQUFTLENBQXFCO1lBQzlCLE9BQUUsR0FBRixFQUFFLENBQWM7WUFDaEIsZUFBVSxHQUFWLFVBQVUsQ0FBZ0M7WUFDMUMsaUJBQVksR0FBWixZQUFZLENBQWM7WUFFbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNuQyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBR00seUNBQWUsR0FBdEI7WUFBQSxpQkFNQztZQUxHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO29CQUNwQyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDZixDQUFDO1FBRUwsc0JBQUM7SUFBRCxDQS9CQSxBQStCQyxJQUFBO0lBL0JZLDZCQUFlLGtCQStCM0IsQ0FBQTtBQUNMLENBQUMsRUFsQ00sYUFBYSxLQUFiLGFBQWEsUUFrQ25CO0FBQ0QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwcm9tb0xpc3QvcHJvbW9MaXN0LmN0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQcm9tb0NvbnRyb2xsZXIge1xuXG4gICAgICAgIHByaXZhdGUgcHJvbW90aW9uczogYW55O1xuICAgICAgICBwcml2YXRlIHNhZ2E6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBkYXRlOiBhbnk7XG4gICAgICAgIHByaXZhdGUgczogYW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsIFxuICAgICAgICAgICAgcHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLCBcbiAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgJGludGVydmFsOiBuZy5JSW50ZXJ2YWxTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlLCBcbiAgICAgICAgICAgIHByaXZhdGUgJHRyYW5zbGF0ZTogbmcudHJhbnNsYXRlLklUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSBwcm9tb1NlcnZpY2U6IFByb21vU2VydmljZSkge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMucHJvbW9TZXJ2aWNlLnBlc3F1aXNhcigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgdGhpcy5wcm9tb3Rpb25zID0gZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb21vTGlzdCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgcHVibGljIHVwZGF0ZVByb21vTGlzdCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuJGludGVydmFsKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9tb1NlcnZpY2UucGVzcXVpc2FyKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb21vdGlvbnMgPSBkYXRhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgMzAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59XG5hcHAuY29udHJvbGxlcignUHJvbW9Db250cm9sbGVyJywgWyckc2NvcGUnLCAnJGh0dHAnLCAnJHRpbWVvdXQnLCAnJGludGVydmFsJywgJyRxJywgJyR0cmFuc2xhdGUnLCAnUHJvbW9TZXJ2aWNlJywgVG9tZWRlc2NvbnRvcy5Qcm9tb0NvbnRyb2xsZXJdKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
