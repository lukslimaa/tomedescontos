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
                    _this.showProductNotification();
                });
            }, 20000);
        };
        PromoController.prototype.setTagColor = function (color) {
            return "ui " + color + " basic tiny button";
        };
        PromoController.prototype.searchSuggestedItem = function (item) {
            $('#findProduct').val(item);
            this.query = item;
        };
        /*|---------------------------------------------------------------------------------------|*
         *| This method implements a function of checking whether user's browser notifications    |*
         *| are allowed. Otherwise, ask user to turn it on to receive alerts for new promotions.  |*
         *|---------------------------------------------------------------------------------------|*/
        PromoController.prototype.turnNotificationOn = function () {
            var chck = Notification.permission;
            if (chck === 'denied' || chck === 'default') {
                Notification.requestPermission(function (permission) {
                    n = new Notification("Alerta TomeDescontos!", {
                        body: "Este alerta aparecerá quando uma nova promoção aparecer para o seu produto!",
                        icon: "../../assets/img/tdLogoBackground.png"
                    });
                });
                /* setting true value to the signal variable */
                this.alertIsOn = true;
            }
            else if (chck === 'unknown') {
                alert("Oh! Seu browser não suporta essa funcionalidade! ;(");
            }
            else {
                this.alertIsOn = true;
            }
        };
        /*|---------------------------------------------------------------------------------------|*
         *| This method is responsible to identify new promotions and set its "new" property as   |*
         *| true in the main array of promotions.                                                 |*
         *|---------------------------------------------------------------------------------------|*/
        PromoController.prototype.showProductNotification = function () {
            var _this = this;
            if (this.aux.length > 0) {
                var result = [];
                /* comparing main list which contains all promotions with a copy of the same list
                 * that we got for the last time.
                 */
                result = this.promotions.filter(function (mainList) {
                    return _this.aux.filter(function (auxList) {
                        return mainList.title === auxList.title;
                    }).length === 0;
                });
                for (var i = 0; i < this.promotions.length; i++) {
                    for (var j = 0; j < result.length; j++) {
                        /* indentifying new promotions in the main array of promotions and marking
                         * them as new (true) using bracket notation.
                         */
                        if (this.promotions[i].title === result[j].title) {
                            this.promotions[i]["new"] = true;
                        }
                        else {
                            this.promotions[i]["new"] = false;
                        }
                    }
                }
                /* calling method responsible to show a notification according to the product
                 * which the user is looking for.
                 */
                this.showNotification(result);
                /* Making a copy of our current array of promotions to an auxiliar array just
                 * to keep it alive for a future comparation and define which rows of the list are
                 * a new promotion and then to light it up!
                 */
                this.aux = this.promotions.slice();
            }
            else {
                this.aux = this.promotions.slice();
            }
        };
        /*|---------------------------------------------------------------------------------------|*
         *| This method implements the part of notifications which will be displayed to user new  |*
         *| a new promotion appears for the product which he is looking for.                      |*
         *|---------------------------------------------------------------------------------------|*/
        PromoController.prototype.showNotification = function (listOfNewPromotions) {
            console.log('produto buscado: ' + this.query + ' num. novas prom.: ' + listOfNewPromotions.length + ' alerta status: ' + this.alertIsOn);
            /* checking whether user had set a product to search on filter, whether there's
             * at least one new promo and then whether user had set the alert mode on.
             */
            if (this.query && listOfNewPromotions.length > 0 && this.alertIsOn) {
                for (var i = 0, x = listOfNewPromotions.length; i < x; i++) {
                    /* identifying whether a new promotion matches with the product which the user
                     * is looking for and then to show a notification to him
                     */
                    if ((listOfNewPromotions[i].title).indexOf(this.query) !== -1) {
                        if (Notification.permission !== 'granted') {
                            Notification.requestPermission();
                        }
                        var n = new Notification("Opaaa!", {
                            body: "Encontramos uma promoção para: " + this.query + ". Corre lá e aproveita!",
                            icon: "../../assets/img/tdLogoBackground.png"
                        });
                        /* make a noise! ;D  */
                        this.playSoundNotification();
                        break;
                    }
                }
            }
        };
        PromoController.prototype.playSoundNotification = function () {
            var sound = document.createElement("audio");
            sound.src = "../../assets/sounds/capisci.mp3";
            sound.setAttribute("preload", "auto");
            sound.setAttribute("controls", "none");
            sound.style.display = "none";
            document.body.appendChild(sound);
            sound.play();
        };
        return PromoController;
    }());
    Tomedescontos.PromoController = PromoController;
})(Tomedescontos || (Tomedescontos = {}));
app.controller('PromoController', ['$scope', '$http', '$timeout', '$interval', '$q', '$translate', 'PromoService', Tomedescontos.PromoController]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21vTGlzdC9wcm9tb0xpc3QuY3RyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQztBQUVwQyxJQUFPLGFBQWEsQ0F5TG5CO0FBekxELFdBQU8sYUFBYSxFQUFDLENBQUM7SUFFbEI7UUFZSSx5QkFBb0IsTUFBaUIsRUFDekIsS0FBc0IsRUFDdEIsUUFBNEIsRUFDNUIsU0FBOEIsRUFDOUIsRUFBZ0IsRUFDaEIsVUFBMEMsRUFDMUMsWUFBMEI7WUFsQjFDLGlCQXNMQztZQTFLdUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtZQUM1QixjQUFTLEdBQVQsU0FBUyxDQUFxQjtZQUM5QixPQUFFLEdBQUYsRUFBRSxDQUFjO1lBQ2hCLGVBQVUsR0FBVixVQUFVLENBQWdDO1lBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBRWxDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUc7Z0JBQ2xCLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO2dCQUNsQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQU8sS0FBSyxFQUFFLFFBQVEsRUFBQztnQkFDckMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFRLEtBQUssRUFBRSxNQUFNLEVBQUM7Z0JBQ25DLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBTyxLQUFLLEVBQUUsUUFBUSxFQUFDO2dCQUNyQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUssS0FBSyxFQUFFLE1BQU0sRUFBQztnQkFDbkMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFLLEtBQUssRUFBRSxPQUFPLEVBQUM7Z0JBQ3BDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRyxLQUFLLEVBQUUs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aUNBQWlDLENBQUM7WUFDOUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWxDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBRUwsc0JBQUM7SUFBRCxDQXRMQSxBQXNMQyxJQUFBO0lBdExZLDZCQUFlLGtCQXNMM0IsQ0FBQTtBQUNMLENBQUMsRUF6TE0sYUFBYSxLQUFiLGFBQWEsUUF5TG5CO0FBQ0QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwcm9tb0xpc3QvcHJvbW9MaXN0LmN0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQcm9tb0NvbnRyb2xsZXIge1xuXG4gICAgICAgIHByaXZhdGUgcHJvbW90aW9uczogYW55W107XG4gICAgICAgIHByaXZhdGUgc2FnYTogYW55O1xuICAgICAgICBwcml2YXRlIGRhdGU6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBzOiBhbnk7XG4gICAgICAgIHByaXZhdGUgc3VnZ2VzdGVkSXRlbXM6IGFueVtdO1xuICAgICAgICBwcml2YXRlIHF1ZXJ5OiBhbnk7XG4gICAgICAgIHByaXZhdGUgYWxlcnRNZTogYm9vbGVhbjtcbiAgICAgICAgcHJpdmF0ZSBhdXg6IGFueVtdO1xuICAgICAgICBwcml2YXRlIGFsZXJ0SXNPbjogYm9vbGVhbjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLCBcbiAgICAgICAgICAgIHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSwgXG4gICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UsXG4gICAgICAgICAgICBwcml2YXRlICRpbnRlcnZhbDogbmcuSUludGVydmFsU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgJHE6IG5nLklRU2VydmljZSwgXG4gICAgICAgICAgICBwcml2YXRlICR0cmFuc2xhdGU6IG5nLnRyYW5zbGF0ZS5JVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgcHJvbW9TZXJ2aWNlOiBQcm9tb1NlcnZpY2UpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5hbGVydE1lID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmF1eCA9IFtdO1xuICAgICAgICAgICAgLyoqIGRlZmluaW5nIGRlZmF1bHQgbGlzdCBvZiBzdWdnZXN0ZWQgaXRlbXMgKi9cbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGVkSXRlbXMgPSBbXG4gICAgICAgICAgICAgICAge25hbWU6IFwiU21hcnRwaG9uZVwiICxjb2xvcjogXCJyZWRcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiTGl2cm9cIiAgICAgICxjb2xvcjogXCJwdXJwbGVcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiU29mw6FcIiAgICAgICAsY29sb3I6IFwiYmx1ZVwifSxcbiAgICAgICAgICAgICAgICB7bmFtZTogXCJUw6puaXNcIiAgICAgICxjb2xvcjogXCJvcmFuZ2VcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiUmVsw7NnaW9cIiAgICAsY29sb3I6IFwiZ3JleVwifSxcbiAgICAgICAgICAgICAgICB7bmFtZTogXCJQZXJmdW1lXCIgICAgLGNvbG9yOiBcImJyb3duXCJ9LFxuICAgICAgICAgICAgICAgIHtuYW1lOiBcIkdlbGFkZWlyYVwiICAsY29sb3I6IFwiZ3JlZW5cIn1cbiAgICAgICAgICAgIF07ICBcblxuICAgICAgICAgICAgJCgnLmFsZXJ0TWUnKS5jaGVja2JveCh7XG4gICAgICAgICAgICAgICAgb25DaGVja2VkOiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHVybk5vdGlmaWNhdGlvbk9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICQoJy5oZWxwLmFsZXJ0JykucG9wdXAoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnQXRpdmUgYSBmdW7Dp8OjbyBcIkFsZXJ0ZS1tZSFcIiBjYXNvIHZvY8OqIG7Do28gdGVuaGEgZW5jb250cmFkbyBhaW5kYSB1bWEgcHJvbW/Dp8OjbyBwYXJhJytcbiAgICAgICAgICAgICAgICAgICAgICAgICcgbyBwcm9kdXRvIHF1ZSBlc3TDoSBwcm9jdXJhbmRvIG91IGRlc2VqZSBtb25pdG9yw6EtbG8gcGFyYSBlbmNvbnRyYXIgdW0gcHJlw6dvIGFpbmRhJytcbiAgICAgICAgICAgICAgICAgICAgICAgICcgbWFpcyBiYWl4by4nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wcm9tb1NlcnZpY2UucGVzcXVpc2FyKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICB0aGlzLnByb21vdGlvbnMgPSBkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvbW9MaXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgdXBkYXRlUHJvbW9MaXN0KCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnByb21vU2VydmljZS5wZXNxdWlzYXIoKS50aGVuKChkYXRhKSA9PiB7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9tb3Rpb25zID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdE5vdGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgMjAwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldFRhZ0NvbG9yKGNvbG9yKTogYW55e1xuICAgICAgICAgICAgcmV0dXJuIFwidWkgXCIgKyBjb2xvciArIFwiIGJhc2ljIHRpbnkgYnV0dG9uXCI7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2VhcmNoU3VnZ2VzdGVkSXRlbShpdGVtKTogdm9pZHtcbiAgICAgICAgICAgICQoJyNmaW5kUHJvZHVjdCcpLnZhbChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgIC8qfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwqXG4gICAgICAgKnwgVGhpcyBtZXRob2QgaW1wbGVtZW50cyBhIGZ1bmN0aW9uIG9mIGNoZWNraW5nIHdoZXRoZXIgdXNlcidzIGJyb3dzZXIgbm90aWZpY2F0aW9ucyAgICB8KlxuICAgICAgICp8IGFyZSBhbGxvd2VkLiBPdGhlcndpc2UsIGFzayB1c2VyIHRvIHR1cm4gaXQgb24gdG8gcmVjZWl2ZSBhbGVydHMgZm9yIG5ldyBwcm9tb3Rpb25zLiAgfCpcbiAgICAgICAqfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwqL1xuXG4gICAgICAgIHB1YmxpYyB0dXJuTm90aWZpY2F0aW9uT24oKTogdm9pZCB7XG4gICAgICAgICAgICB2YXIgY2hjayA9IE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uOyBcbiAgICAgICAgICAgIGlmKCBjaGNrID09PSAnZGVuaWVkJyB8fCBjaGNrID09PSAnZGVmYXVsdCcgKXtcblxuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbihwZXJtaXNzaW9uKXtcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5ldyBOb3RpZmljYXRpb24oIFwiQWxlcnRhIFRvbWVEZXNjb250b3MhXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IFwiRXN0ZSBhbGVydGEgYXBhcmVjZXLDoSBxdWFuZG8gdW1hIG5vdmEgcHJvbW/Dp8OjbyBhcGFyZWNlciBwYXJhIG8gc2V1IHByb2R1dG8hXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbiA6IFwiLi4vLi4vYXNzZXRzL2ltZy90ZExvZ29CYWNrZ3JvdW5kLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLyogc2V0dGluZyB0cnVlIHZhbHVlIHRvIHRoZSBzaWduYWwgdmFyaWFibGUgKi8gXG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydElzT24gPSB0cnVlO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2UgaWYoIGNoY2sgPT09ICd1bmtub3duJyApe1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiT2ghIFNldSBicm93c2VyIG7Do28gc3Vwb3J0YSBlc3NhIGZ1bmNpb25hbGlkYWRlISA7KFwiKSBcbiAgICAgICAgICAgIH0gZWxzZSB7dGhpcy5hbGVydElzT24gPSB0cnVlO31cbiAgICAgICAgfVxuXG4gICAgICAvKnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18KlxuICAgICAgICp8IFRoaXMgbWV0aG9kIGlzIHJlc3BvbnNpYmxlIHRvIGlkZW50aWZ5IG5ldyBwcm9tb3Rpb25zIGFuZCBzZXQgaXRzIFwibmV3XCIgcHJvcGVydHkgYXMgICB8KlxuICAgICAgICp8IHRydWUgaW4gdGhlIG1haW4gYXJyYXkgb2YgcHJvbW90aW9ucy4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCpcbiAgICAgICAqfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwqL1xuICAgICAgICBwdWJsaWMgc2hvd1Byb2R1Y3ROb3RpZmljYXRpb24oKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLmF1eC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgICAgICAgICAgICAvKiBjb21wYXJpbmcgbWFpbiBsaXN0IHdoaWNoIGNvbnRhaW5zIGFsbCBwcm9tb3Rpb25zIHdpdGggYSBjb3B5IG9mIHRoZSBzYW1lIGxpc3QgXG4gICAgICAgICAgICAgICAgICogdGhhdCB3ZSBnb3QgZm9yIHRoZSBsYXN0IHRpbWUuIFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJvbW90aW9ucy5maWx0ZXIoKG1haW5MaXN0KT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hdXguZmlsdGVyKChhdXhMaXN0KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1haW5MaXN0LnRpdGxlID09PSBhdXhMaXN0LnRpdGxlO1xuICAgICAgICAgICAgICAgICAgICB9KS5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9tb3Rpb25zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHJlc3VsdC5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIGluZGVudGlmeWluZyBuZXcgcHJvbW90aW9ucyBpbiB0aGUgbWFpbiBhcnJheSBvZiBwcm9tb3Rpb25zIGFuZCBtYXJraW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGVtIGFzIG5ldyAodHJ1ZSkgdXNpbmcgYnJhY2tldCBub3RhdGlvbi4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucHJvbW90aW9uc1tpXS50aXRsZSA9PT0gcmVzdWx0W2pdLnRpdGxlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb21vdGlvbnNbaV1bXCJuZXdcIl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgdGhpcy5wcm9tb3Rpb25zW2ldW1wibmV3XCJdID0gZmFsc2U7fSBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIGNhbGxpbmcgbWV0aG9kIHJlc3BvbnNpYmxlIHRvIHNob3cgYSBub3RpZmljYXRpb24gYWNjb3JkaW5nIHRvIHRoZSBwcm9kdWN0XG4gICAgICAgICAgICAgICAgICogd2hpY2ggdGhlIHVzZXIgaXMgbG9va2luZyBmb3IuIFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbihyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgLyogTWFraW5nIGEgY29weSBvZiBvdXIgY3VycmVudCBhcnJheSBvZiBwcm9tb3Rpb25zIHRvIGFuIGF1eGlsaWFyIGFycmF5IGp1c3RcbiAgICAgICAgICAgICAgICAgKiB0byBrZWVwIGl0IGFsaXZlIGZvciBhIGZ1dHVyZSBjb21wYXJhdGlvbiBhbmQgZGVmaW5lIHdoaWNoIHJvd3Mgb2YgdGhlIGxpc3QgYXJlXG4gICAgICAgICAgICAgICAgICogYSBuZXcgcHJvbW90aW9uIGFuZCB0aGVuIHRvIGxpZ2h0IGl0IHVwISBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmF1eCA9IHRoaXMucHJvbW90aW9ucy5zbGljZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHt0aGlzLmF1eCA9IHRoaXMucHJvbW90aW9ucy5zbGljZSgpO31cbiAgICAgICAgfVxuXG4gICAgICAvKnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18KlxuICAgICAgICp8IFRoaXMgbWV0aG9kIGltcGxlbWVudHMgdGhlIHBhcnQgb2Ygbm90aWZpY2F0aW9ucyB3aGljaCB3aWxsIGJlIGRpc3BsYXllZCB0byB1c2VyIG5ldyAgfCpcbiAgICAgICAqfCBhIG5ldyBwcm9tb3Rpb24gYXBwZWFycyBmb3IgdGhlIHByb2R1Y3Qgd2hpY2ggaGUgaXMgbG9va2luZyBmb3IuICAgICAgICAgICAgICAgICAgICAgIHwqXG4gICAgICAgKnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18Ki9cbiAgICAgICAgcHVibGljIHNob3dOb3RpZmljYXRpb24obGlzdE9mTmV3UHJvbW90aW9uczphbnlbXSk6dm9pZCB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHJvZHV0byBidXNjYWRvOiAnICsgdGhpcy5xdWVyeSArICcgbnVtLiBub3ZhcyBwcm9tLjogJyArIGxpc3RPZk5ld1Byb21vdGlvbnMubGVuZ3RoICsgJyBhbGVydGEgc3RhdHVzOiAnICsgdGhpcy5hbGVydElzT24pXG4gICAgICAgICAgICAvKiBjaGVja2luZyB3aGV0aGVyIHVzZXIgaGFkIHNldCBhIHByb2R1Y3QgdG8gc2VhcmNoIG9uIGZpbHRlciwgd2hldGhlciB0aGVyZSdzXG4gICAgICAgICAgICAgKiBhdCBsZWFzdCBvbmUgbmV3IHByb21vIGFuZCB0aGVuIHdoZXRoZXIgdXNlciBoYWQgc2V0IHRoZSBhbGVydCBtb2RlIG9uLiBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYodGhpcy5xdWVyeSAmJiBsaXN0T2ZOZXdQcm9tb3Rpb25zLmxlbmd0aCA+IDAgJiYgdGhpcy5hbGVydElzT24peyBcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwLCB4ID0gbGlzdE9mTmV3UHJvbW90aW9ucy5sZW5ndGg7IGkgPCB4OyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLyogaWRlbnRpZnlpbmcgd2hldGhlciBhIG5ldyBwcm9tb3Rpb24gbWF0Y2hlcyB3aXRoIHRoZSBwcm9kdWN0IHdoaWNoIHRoZSB1c2VyXG4gICAgICAgICAgICAgICAgICAgICAqIGlzIGxvb2tpbmcgZm9yIGFuZCB0aGVuIHRvIHNob3cgYSBub3RpZmljYXRpb24gdG8gaGltIFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYoKGxpc3RPZk5ld1Byb21vdGlvbnNbaV0udGl0bGUpLmluZGV4T2YodGhpcy5xdWVyeSkgIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09ICdncmFudGVkJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IG5ldyBOb3RpZmljYXRpb24oIFwiT3BhYWEhXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBcIkVuY29udHJhbW9zIHVtYSBwcm9tb8Onw6NvIHBhcmE6IFwiICsgdGhpcy5xdWVyeSArIFwiLiBDb3JyZSBsw6EgZSBhcHJvdmVpdGEhXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb24gOiBcIi4uLy4uL2Fzc2V0cy9pbWcvdGRMb2dvQmFja2dyb3VuZC5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIG1ha2UgYSBub2lzZSEgO0QgICovXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTb3VuZE5vdGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7ICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwbGF5U291bmROb3RpZmljYXRpb24oKTogdm9pZCB7XG4gICAgICAgICAgICB2YXIgc291bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIik7XG4gICAgICAgICAgICBzb3VuZC5zcmMgPSBcIi4uLy4uL2Fzc2V0cy9zb3VuZHMvY2FwaXNjaS5tcDNcIjtcbiAgICAgICAgICAgIHNvdW5kLnNldEF0dHJpYnV0ZShcInByZWxvYWRcIixcImF1dG9cIik7XG4gICAgICAgICAgICBzb3VuZC5zZXRBdHRyaWJ1dGUoXCJjb250cm9sc1wiLFwibm9uZVwiKTtcbiAgICAgICAgICAgIHNvdW5kLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc291bmQpO1xuXG4gICAgICAgICAgIHNvdW5kLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuYXBwLmNvbnRyb2xsZXIoJ1Byb21vQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRodHRwJywgJyR0aW1lb3V0JywgJyRpbnRlcnZhbCcsICckcScsICckdHJhbnNsYXRlJywgJ1Byb21vU2VydmljZScsIFRvbWVkZXNjb250b3MuUHJvbW9Db250cm9sbGVyXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
