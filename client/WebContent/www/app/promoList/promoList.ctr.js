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
            this.alertMe = false;
            this.aux = [];
            /** defining default list of suggested items */
            this.suggestedItems = [
                { name: "Smartphone", color: "red" },
                { name: "Livro", color: "purple" },
                { name: "Sofá", color: "blue" },
                { name: "Tênis", color: "orange" },
                { name: "Relógio", color: "grey" },
                { name: "Perfume", color: "brown" },
                { name: "Geladeira", color: "green" }
            ];
            $('.alertMe').checkbox({
                onChecked: function () {
                    _this.turnNotificationOn();
                }
            });
            $('.help.alert').popup({
                title: 'Ative a função "Alerte-me!" caso você não tenha encontrado ainda uma promoção para' +
                    ' o produto que está procurando ou deseje monitorá-lo para encontrar um preço ainda' +
                    ' mais baixo.'
            });
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
                    _this.showProductNotification(_this.promotions, _this.query);
                });
            }, 60000);
        };
        PromoController.prototype.setTagColor = function (color) {
            return "ui " + color + " basic tiny button";
        };
        PromoController.prototype.searchSuggestedItem = function (item) {
            $('#findProduct').val(item);
            this.query = item;
        };
        PromoController.prototype.turnNotificationOn = function () {
            var chck = Notification.permission;
            if (chck === 'denied' || chck === 'default') {
                Notification.requestPermission(function (permission) {
                    n = new Notification("Alerta TomeDescontos!", {
                        body: "Este alerta aparecerá quando uma nova promoção aparecer para o seu produto!",
                        icon: "../../assets/img/tdLogoBackground.png"
                    });
                });
            }
            else if (chck === 'unknown') {
                alert("Oh! Seu browser não suporta essa funcionalidade! ;(");
            }
        };
        PromoController.prototype.showProductNotification = function (list, product) {
            var filteredList = [];
            if (product) {
                /** checking if exists the product in the general array which contains all promotions */
                for (var i = 0; i < list.length; i++) {
                    var title = list[i].title.toLowerCase();
                    if (title.indexOf(product.toLowerCase()) != -1) {
                        filteredList.push(list[i]);
                    }
                }
                console.log('filtered: ' + filteredList.length + ' aux: ' + this.aux.length);
                /** comparing the filtered list length to  */
                if (filteredList.length > this.aux.length) {
                    for (var j = 0; j < filteredList.length; j++) {
                        if (($.inArray(filteredList[j].title, this.aux)) === -1) {
                            filteredList[j]["new"] = true;
                        }
                    }
                    console.log(filteredList);
                    /** copying the filteredList array to aux */
                    this.aux = filteredList.slice();
                }
            }
        };
        return PromoController;
    }());
    Tomedescontos.PromoController = PromoController;
})(Tomedescontos || (Tomedescontos = {}));
app.controller('PromoController', ['$scope', '$http', '$timeout', '$interval', '$q', '$translate', 'PromoService', Tomedescontos.PromoController]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21vTGlzdC9wcm9tb0xpc3QuY3RyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQztBQUVwQyxJQUFPLGFBQWEsQ0FtSG5CO0FBbkhELFdBQU8sYUFBYSxFQUFDLENBQUM7SUFFbEI7UUFXSSx5QkFBb0IsTUFBaUIsRUFDekIsS0FBc0IsRUFDdEIsUUFBNEIsRUFDNUIsU0FBOEIsRUFDOUIsRUFBZ0IsRUFDaEIsVUFBMEMsRUFDMUMsWUFBMEI7WUFqQjFDLGlCQWdIQztZQXJHdUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtZQUM1QixjQUFTLEdBQVQsU0FBUyxDQUFxQjtZQUM5QixPQUFFLEdBQUYsRUFBRSxDQUFjO1lBQ2hCLGVBQVUsR0FBVixVQUFVLENBQWdDO1lBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBRWxDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUc7Z0JBQ2xCLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO2dCQUNsQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQU8sS0FBSyxFQUFFLFFBQVEsRUFBQztnQkFDckMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFRLEtBQUssRUFBRSxNQUFNLEVBQUM7Z0JBQ25DLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBTyxLQUFLLEVBQUUsUUFBUSxFQUFDO2dCQUNyQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUssS0FBSyxFQUFFLE1BQU0sRUFBQztnQkFDbkMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFLLEtBQUssRUFBRSxPQUFPLEVBQUM7Z0JBQ3BDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRyxLQUFLLEVBQUUs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cm9tb0xpc3QvcHJvbW9MaXN0LmN0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQcm9tb0NvbnRyb2xsZXIge1xuXG4gICAgICAgIHByaXZhdGUgcHJvbW90aW9uczogYW55O1xuICAgICAgICBwcml2YXRlIHNhZ2E6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBkYXRlOiBhbnk7XG4gICAgICAgIHByaXZhdGUgczogYW55O1xuICAgICAgICBwcml2YXRlIHN1Z2dlc3RlZEl0ZW1zOiBhbnlbXTtcbiAgICAgICAgcHJpdmF0ZSBxdWVyeTogYW55O1xuICAgICAgICBwcml2YXRlIGFsZXJ0TWU6IGJvb2xlYW47XG4gICAgICAgIHByaXZhdGUgYXV4OiBhbnlbXTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLCBcbiAgICAgICAgICAgIHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSwgXG4gICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UsXG4gICAgICAgICAgICBwcml2YXRlICRpbnRlcnZhbDogbmcuSUludGVydmFsU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgJHE6IG5nLklRU2VydmljZSwgXG4gICAgICAgICAgICBwcml2YXRlICR0cmFuc2xhdGU6IG5nLnRyYW5zbGF0ZS5JVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgcHJvbW9TZXJ2aWNlOiBQcm9tb1NlcnZpY2UpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5hbGVydE1lID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmF1eCA9IFtdO1xuICAgICAgICAgICAgLyoqIGRlZmluaW5nIGRlZmF1bHQgbGlzdCBvZiBzdWdnZXN0ZWQgaXRlbXMgKi9cbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGVkSXRlbXMgPSBbXG4gICAgICAgICAgICAgICAge25hbWU6IFwiU21hcnRwaG9uZVwiICxjb2xvcjogXCJyZWRcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiTGl2cm9cIiAgICAgICxjb2xvcjogXCJwdXJwbGVcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiU29mw6FcIiAgICAgICAsY29sb3I6IFwiYmx1ZVwifSxcbiAgICAgICAgICAgICAgICB7bmFtZTogXCJUw6puaXNcIiAgICAgICxjb2xvcjogXCJvcmFuZ2VcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiUmVsw7NnaW9cIiAgICAsY29sb3I6IFwiZ3JleVwifSxcbiAgICAgICAgICAgICAgICB7bmFtZTogXCJQZXJmdW1lXCIgICAgLGNvbG9yOiBcImJyb3duXCJ9LFxuICAgICAgICAgICAgICAgIHtuYW1lOiBcIkdlbGFkZWlyYVwiICAsY29sb3I6IFwiZ3JlZW5cIn1cbiAgICAgICAgICAgIF07ICBcblxuICAgICAgICAgICAgJCgnLmFsZXJ0TWUnKS5jaGVja2JveCh7XG4gICAgICAgICAgICAgICAgb25DaGVja2VkOiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHVybk5vdGlmaWNhdGlvbk9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICQoJy5oZWxwLmFsZXJ0JykucG9wdXAoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnQXRpdmUgYSBmdW7Dp8OjbyBcIkFsZXJ0ZS1tZSFcIiBjYXNvIHZvY8OqIG7Do28gdGVuaGEgZW5jb250cmFkbyBhaW5kYSB1bWEgcHJvbW/Dp8OjbyBwYXJhJytcbiAgICAgICAgICAgICAgICAgICAgICAgICcgbyBwcm9kdXRvIHF1ZSBlc3TDoSBwcm9jdXJhbmRvIG91IGRlc2VqZSBtb25pdG9yw6EtbG8gcGFyYSBlbmNvbnRyYXIgdW0gcHJlw6dvIGFpbmRhJytcbiAgICAgICAgICAgICAgICAgICAgICAgICcgbWFpcyBiYWl4by4nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wcm9tb1NlcnZpY2UucGVzcXVpc2FyKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICB0aGlzLnByb21vdGlvbnMgPSBkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvbW9MaXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgdXBkYXRlUHJvbW9MaXN0KCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnByb21vU2VydmljZS5wZXNxdWlzYXIoKS50aGVuKChkYXRhKSA9PiB7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9tb3Rpb25zID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdE5vdGlmaWNhdGlvbih0aGlzLnByb21vdGlvbnMsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgNjAwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldFRhZ0NvbG9yKGNvbG9yKTogYW55e1xuICAgICAgICAgICAgcmV0dXJuIFwidWkgXCIgKyBjb2xvciArIFwiIGJhc2ljIHRpbnkgYnV0dG9uXCI7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2VhcmNoU3VnZ2VzdGVkSXRlbShpdGVtKTogdm9pZHtcbiAgICAgICAgICAgICQoJyNmaW5kUHJvZHVjdCcpLnZhbChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHR1cm5Ob3RpZmljYXRpb25PbigpOiB2b2lkIHtcbiAgICAgICAgICAgIHZhciBjaGNrID0gTm90aWZpY2F0aW9uLnBlcm1pc3Npb247IFxuICAgICAgICAgICAgaWYoIGNoY2sgPT09ICdkZW5pZWQnIHx8IGNoY2sgPT09ICdkZWZhdWx0JyApe1xuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbihwZXJtaXNzaW9uKXtcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5ldyBOb3RpZmljYXRpb24oIFwiQWxlcnRhIFRvbWVEZXNjb250b3MhXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IFwiRXN0ZSBhbGVydGEgYXBhcmVjZXLDoSBxdWFuZG8gdW1hIG5vdmEgcHJvbW/Dp8OjbyBhcGFyZWNlciBwYXJhIG8gc2V1IHByb2R1dG8hXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbiA6IFwiLi4vLi4vYXNzZXRzL2ltZy90ZExvZ29CYWNrZ3JvdW5kLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIGNoY2sgPT09ICd1bmtub3duJyApe1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiT2ghIFNldSBicm93c2VyIG7Do28gc3Vwb3J0YSBlc3NhIGZ1bmNpb25hbGlkYWRlISA7KFwiKSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzaG93UHJvZHVjdE5vdGlmaWNhdGlvbihsaXN0LCBwcm9kdWN0KTogdm9pZCB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRMaXN0ID0gW107XG5cbiAgICAgICAgICAgIGlmKHByb2R1Y3Qpe1xuXG4gICAgICAgICAgICAgICAgLyoqIGNoZWNraW5nIGlmIGV4aXN0cyB0aGUgcHJvZHVjdCBpbiB0aGUgZ2VuZXJhbCBhcnJheSB3aGljaCBjb250YWlucyBhbGwgcHJvbW90aW9ucyAqL1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gbGlzdFtpXS50aXRsZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZih0aXRsZS5pbmRleE9mKHByb2R1Y3QudG9Mb3dlckNhc2UoKSkgIT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRMaXN0LnB1c2gobGlzdFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbHRlcmVkOiAnICsgZmlsdGVyZWRMaXN0Lmxlbmd0aCArICcgYXV4OiAnICsgdGhpcy5hdXgubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvKiogY29tcGFyaW5nIHRoZSBmaWx0ZXJlZCBsaXN0IGxlbmd0aCB0byAgKi9cbiAgICAgICAgICAgICAgICBpZihmaWx0ZXJlZExpc3QubGVuZ3RoID4gdGhpcy5hdXgubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGZpbHRlcmVkTGlzdC5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZigoJC5pbkFycmF5KGZpbHRlcmVkTGlzdFtqXS50aXRsZSwgdGhpcy5hdXgpKSA9PT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkTGlzdFtqXVtcIm5ld1wiXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmlsdGVyZWRMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8qKiBjb3B5aW5nIHRoZSBmaWx0ZXJlZExpc3QgYXJyYXkgdG8gYXV4ICovICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1eCA9IGZpbHRlcmVkTGlzdC5zbGljZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmFwcC5jb250cm9sbGVyKCdQcm9tb0NvbnRyb2xsZXInLCBbJyRzY29wZScsICckaHR0cCcsICckdGltZW91dCcsICckaW50ZXJ2YWwnLCAnJHEnLCAnJHRyYW5zbGF0ZScsICdQcm9tb1NlcnZpY2UnLCBUb21lZGVzY29udG9zLlByb21vQ29udHJvbGxlcl0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
