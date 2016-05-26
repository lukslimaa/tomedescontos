/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var PromoController = (function () {
        function PromoController($scope, $http, $q, $stateParams, $translate, promoService) {
            this.$scope = $scope;
            this.$http = $http;
            this.$q = $q;
            this.$stateParams = $stateParams;
            this.$translate = $translate;
            this.promoService = promoService;
            this.findAll();
        }
        PromoController.prototype.changeStatus = function (status) {
            var _this = this;
            this.saga = status;
            if (this.saga) {
                setInterval(function () {
                    console.log('chamou!');
                    _this.findAll();
                }, 60000);
            }
        };
        PromoController.prototype.findAll = function () {
            var _this = this;
            this.promoService.pesquisar().then(function (data) {
                _this.promotions = data;
                console.log('itens atualizados!');
            });
        };
        return PromoController;
    }());
    Tomedescontos.PromoController = PromoController;
})(Tomedescontos || (Tomedescontos = {}));
app.controller('PromoController', ['$scope', '$http', '$q', '$stateParams', '$translate', 'PromoService', Tomedescontos.PromoController]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21vTGlzdC9wcm9tb0xpc3QuY3RyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQztBQUVwQyxJQUFPLGFBQWEsQ0FxQ25CO0FBckNELFdBQU8sYUFBYSxFQUFDLENBQUM7SUFFbEI7UUFNSSx5QkFBb0IsTUFBaUIsRUFDekIsS0FBc0IsRUFDdEIsRUFBZ0IsRUFDaEIsWUFBWSxFQUNaLFVBQTBDLEVBQzFDLFlBQTBCO1lBTGxCLFdBQU0sR0FBTixNQUFNLENBQVc7WUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7WUFDdEIsT0FBRSxHQUFGLEVBQUUsQ0FBYztZQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBQTtZQUNaLGVBQVUsR0FBVixVQUFVLENBQWdDO1lBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBRWxDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVuQixDQUFDO1FBRU0sc0NBQVksR0FBbkIsVUFBb0IsTUFBTTtZQUExQixpQkFRQztZQVBHLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1lBQ25CLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNWLFdBQVcsQ0FBQztvQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN2QixLQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ2xCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNkLENBQUM7UUFDTCxDQUFDO1FBRU0saUNBQU8sR0FBZDtZQUFBLGlCQUtDO1lBSkcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNwQyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVMLHNCQUFDO0lBQUQsQ0FsQ0EsQUFrQ0MsSUFBQTtJQWxDWSw2QkFBZSxrQkFrQzNCLENBQUE7QUFDTCxDQUFDLEVBckNNLGFBQWEsS0FBYixhQUFhLFFBcUNuQjtBQUNELEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwcm9tb0xpc3QvcHJvbW9MaXN0LmN0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQcm9tb0NvbnRyb2xsZXIge1xuXG4gICAgICAgIHByaXZhdGUgcHJvbW90aW9uczogYW55O1xuICAgICAgICBwcml2YXRlIHNhZ2E6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBkYXRlOiBhbnk7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSwgXG4gICAgICAgICAgICBwcml2YXRlICRodHRwOiBuZy5JSHR0cFNlcnZpY2UsIFxuICAgICAgICAgICAgcHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSAkc3RhdGVQYXJhbXMsIFxuICAgICAgICAgICAgcHJpdmF0ZSAkdHJhbnNsYXRlOiBuZy50cmFuc2xhdGUuSVRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgICAgICAgICBwcml2YXRlIHByb21vU2VydmljZTogUHJvbW9TZXJ2aWNlKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZmluZEFsbCgpO1xuICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBjaGFuZ2VTdGF0dXMoc3RhdHVzKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnNhZ2EgPSBzdGF0dXM7XG4gICAgICAgICAgICBpZih0aGlzLnNhZ2Epe1xuICAgICAgICAgICAgICAgIHNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFtb3UhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEFsbCgpXG4gICAgICAgICAgICAgICAgfSwgNjAwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgZmluZEFsbCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvbW9TZXJ2aWNlLnBlc3F1aXNhcigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb21vdGlvbnMgPSBkYXRhO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdGVucyBhdHVhbGl6YWRvcyEnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cbmFwcC5jb250cm9sbGVyKCdQcm9tb0NvbnRyb2xsZXInLCBbJyRzY29wZScsICckaHR0cCcsICckcScsICckc3RhdGVQYXJhbXMnLCAnJHRyYW5zbGF0ZScsICdQcm9tb1NlcnZpY2UnLCBUb21lZGVzY29udG9zLlByb21vQ29udHJvbGxlcl0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
