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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21vTGlzdC9wcm9tb0xpc3QuY3RyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQztBQUVwQyxJQUFPLGFBQWEsQ0F5TG5CO0FBekxELFdBQU8sYUFBYSxFQUFDLENBQUM7SUFFbEI7UUFZSSx5QkFBb0IsTUFBaUIsRUFDekIsS0FBc0IsRUFDdEIsUUFBNEIsRUFDNUIsU0FBOEIsRUFDOUIsRUFBZ0IsRUFDaEIsVUFBMEMsRUFDMUMsWUFBMEI7WUFsQjFDLGlCQXNMQztZQTFLdUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtZQUM1QixjQUFTLEdBQVQsU0FBUyxDQUFxQjtZQUM5QixPQUFFLEdBQUYsRUFBRSxDQUFjO1lBQ2hCLGVBQVUsR0FBVixVQUFVLENBQWdDO1lBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBRWxDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUc7Z0JBQ2xCLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO2dCQUNsQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQU8sS0FBSyxFQUFFLFFBQVEsRUFBQztnQkFDckMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFRLEtBQUssRUFBRSxNQUFNLEVBQUM7Z0JBQ25DLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBTyxLQUFLLEVBQUUsUUFBUSxFQUFDO2dCQUNyQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUssS0FBSyxFQUFFLE1BQU0sRUFBQztnQkFDbkMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFLLEtBQUssRUFBRSxPQUFPLEVBQUM7Z0JBQ3BDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRyxLQUFLLEVBQUUs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aUNBQWlDLENBQUM7WUFDOUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWxDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBRUwsc0JBQUM7SUFBRCxDQXRMQSxBQXNMQyxJQUFBO0lBdExZLDZCQUFlLGtCQXNMM0IsQ0FBQTtBQUNMLENBQUMsRUF6TE0sYUFBYSxLQUFiLGFBQWEsUUF5TG5CO0FBQ0QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwcm9tb0xpc3QvcHJvbW9MaXN0LmN0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQcm9tb0NvbnRyb2xsZXIge1xuXG4gICAgICAgIHByaXZhdGUgcHJvbW90aW9uczogYW55W107XG4gICAgICAgIHByaXZhdGUgc2FnYTogYW55O1xuICAgICAgICBwcml2YXRlIGRhdGU6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBzOiBhbnk7XG4gICAgICAgIHByaXZhdGUgc3VnZ2VzdGVkSXRlbXM6IGFueVtdO1xuICAgICAgICBwcml2YXRlIHF1ZXJ5OiBhbnk7XG4gICAgICAgIHByaXZhdGUgYWxlcnRNZTogYm9vbGVhbjtcbiAgICAgICAgcHJpdmF0ZSBhdXg6IGFueVtdO1xuICAgICAgICBwcml2YXRlIGFsZXJ0SXNPbjogYm9vbGVhbjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLCBcbiAgICAgICAgICAgIHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSwgXG4gICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UsXG4gICAgICAgICAgICBwcml2YXRlICRpbnRlcnZhbDogbmcuSUludGVydmFsU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgJHE6IG5nLklRU2VydmljZSwgXG4gICAgICAgICAgICBwcml2YXRlICR0cmFuc2xhdGU6IG5nLnRyYW5zbGF0ZS5JVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgcHJvbW9TZXJ2aWNlOiBQcm9tb1NlcnZpY2UpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5hbGVydE1lID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmF1eCA9IFtdO1xuICAgICAgICAgICAgLyoqIGRlZmluaW5nIGRlZmF1bHQgbGlzdCBvZiBzdWdnZXN0ZWQgaXRlbXMgKi9cbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGVkSXRlbXMgPSBbXG4gICAgICAgICAgICAgICAge25hbWU6IFwiU21hcnRwaG9uZVwiICxjb2xvcjogXCJyZWRcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiTGl2cm9cIiAgICAgICxjb2xvcjogXCJwdXJwbGVcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiU29mw6FcIiAgICAgICAsY29sb3I6IFwiYmx1ZVwifSxcbiAgICAgICAgICAgICAgICB7bmFtZTogXCJUw6puaXNcIiAgICAgICxjb2xvcjogXCJvcmFuZ2VcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiUmVsw7NnaW9cIiAgICAsY29sb3I6IFwiZ3JleVwifSxcbiAgICAgICAgICAgICAgICB7bmFtZTogXCJQZXJmdW1lXCIgICAgLGNvbG9yOiBcImJyb3duXCJ9LFxuICAgICAgICAgICAgICAgIHtuYW1lOiBcIkdlbGFkZWlyYVwiICAsY29sb3I6IFwiZ3JlZW5cIn1cbiAgICAgICAgICAgIF07ICBcblxuICAgICAgICAgICAgJCgnLmFsZXJ0TWUnKS5jaGVja2JveCh7XG4gICAgICAgICAgICAgICAgb25DaGVja2VkOigpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dXJuTm90aWZpY2F0aW9uT24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCgnLmhlbHAuYWxlcnQnKS5wb3B1cCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdBdGl2ZSBhIGZ1bsOnw6NvIFwiQWxlcnRlLW1lIVwiIGNhc28gdm9jw6ogbsOjbyB0ZW5oYSBlbmNvbnRyYWRvIGFpbmRhIHVtYSBwcm9tb8Onw6NvIHBhcmEnK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBvIHByb2R1dG8gcXVlIGVzdMOhIHByb2N1cmFuZG8gb3UgZGVzZWplIG1vbml0b3LDoS1sbyBwYXJhIGVuY29udHJhciB1bSBwcmXDp28gYWluZGEnK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBtYWlzIGJhaXhvLidcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnByb21vU2VydmljZS5wZXNxdWlzYXIoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgIHRoaXMucHJvbW90aW9ucyA9IGRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9tb0xpc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyB1cGRhdGVQcm9tb0xpc3QoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLiRpbnRlcnZhbCgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMucHJvbW9TZXJ2aWNlLnBlc3F1aXNhcigpLnRoZW4oKGRhdGEpID0+IHsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb21vdGlvbnMgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0Tm90aWZpY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAyMDAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0VGFnQ29sb3IoY29sb3IpOiBhbnl7XG4gICAgICAgICAgICByZXR1cm4gXCJ1aSBcIiArIGNvbG9yICsgXCIgYmFzaWMgdGlueSBidXR0b25cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZWFyY2hTdWdnZXN0ZWRJdGVtKGl0ZW0pOiB2b2lke1xuICAgICAgICAgICAgJCgnI2ZpbmRQcm9kdWN0JykudmFsKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5xdWVyeSA9IGl0ZW07XG4gICAgICAgIH1cblxuICAgICAgLyp8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfCpcbiAgICAgICAqfCBUaGlzIG1ldGhvZCBpbXBsZW1lbnRzIGEgZnVuY3Rpb24gb2YgY2hlY2tpbmcgd2hldGhlciB1c2VyJ3MgYnJvd3NlciBub3RpZmljYXRpb25zICAgIHwqXG4gICAgICAgKnwgYXJlIGFsbG93ZWQuIE90aGVyd2lzZSwgYXNrIHVzZXIgdG8gdHVybiBpdCBvbiB0byByZWNlaXZlIGFsZXJ0cyBmb3IgbmV3IHByb21vdGlvbnMuICB8KlxuICAgICAgICp8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfCovXG5cbiAgICAgICAgcHVibGljIHR1cm5Ob3RpZmljYXRpb25PbigpOiB2b2lkIHtcbiAgICAgICAgICAgIHZhciBjaGNrID0gTm90aWZpY2F0aW9uLnBlcm1pc3Npb247IFxuICAgICAgICAgICAgaWYoIGNoY2sgPT09ICdkZW5pZWQnIHx8IGNoY2sgPT09ICdkZWZhdWx0JyApe1xuXG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uKHBlcm1pc3Npb24pe1xuICAgICAgICAgICAgICAgICAgICBuID0gbmV3IE5vdGlmaWNhdGlvbiggXCJBbGVydGEgVG9tZURlc2NvbnRvcyFcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogXCJFc3RlIGFsZXJ0YSBhcGFyZWNlcsOhIHF1YW5kbyB1bWEgbm92YSBwcm9tb8Onw6NvIGFwYXJlY2VyIHBhcmEgbyBzZXUgcHJvZHV0byFcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uIDogXCIuLi8uLi9hc3NldHMvaW1nL3RkTG9nb0JhY2tncm91bmQucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvKiBzZXR0aW5nIHRydWUgdmFsdWUgdG8gdGhlIHNpZ25hbCB2YXJpYWJsZSAqLyBcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0SXNPbiA9IHRydWU7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSBpZiggY2hjayA9PT0gJ3Vua25vd24nICl7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJPaCEgU2V1IGJyb3dzZXIgbsOjbyBzdXBvcnRhIGVzc2EgZnVuY2lvbmFsaWRhZGUhIDsoXCIpIFxuICAgICAgICAgICAgfSBlbHNlIHt0aGlzLmFsZXJ0SXNPbiA9IHRydWU7fVxuICAgICAgICB9XG5cbiAgICAgIC8qfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwqXG4gICAgICAgKnwgVGhpcyBtZXRob2QgaXMgcmVzcG9uc2libGUgdG8gaWRlbnRpZnkgbmV3IHByb21vdGlvbnMgYW5kIHNldCBpdHMgXCJuZXdcIiBwcm9wZXJ0eSBhcyAgIHwqXG4gICAgICAgKnwgdHJ1ZSBpbiB0aGUgbWFpbiBhcnJheSBvZiBwcm9tb3Rpb25zLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8KlxuICAgICAgICp8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfCovXG4gICAgICAgIHB1YmxpYyBzaG93UHJvZHVjdE5vdGlmaWNhdGlvbigpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMuYXV4Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8qIGNvbXBhcmluZyBtYWluIGxpc3Qgd2hpY2ggY29udGFpbnMgYWxsIHByb21vdGlvbnMgd2l0aCBhIGNvcHkgb2YgdGhlIHNhbWUgbGlzdCBcbiAgICAgICAgICAgICAgICAgKiB0aGF0IHdlIGdvdCBmb3IgdGhlIGxhc3QgdGltZS4gXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wcm9tb3Rpb25zLmZpbHRlcigobWFpbkxpc3QpPT57XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF1eC5maWx0ZXIoKGF1eExpc3QpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFpbkxpc3QudGl0bGUgPT09IGF1eExpc3QudGl0bGU7XG4gICAgICAgICAgICAgICAgICAgIH0pLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnByb21vdGlvbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLyogaW5kZW50aWZ5aW5nIG5ldyBwcm9tb3Rpb25zIGluIHRoZSBtYWluIGFycmF5IG9mIHByb21vdGlvbnMgYW5kIG1hcmtpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIHRoZW0gYXMgbmV3ICh0cnVlKSB1c2luZyBicmFja2V0IG5vdGF0aW9uLiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5wcm9tb3Rpb25zW2ldLnRpdGxlID09PSByZXN1bHRbal0udGl0bGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvbW90aW9uc1tpXVtcIm5ld1wiXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyB0aGlzLnByb21vdGlvbnNbaV1bXCJuZXdcIl0gPSBmYWxzZTt9IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogY2FsbGluZyBtZXRob2QgcmVzcG9uc2libGUgdG8gc2hvdyBhIG5vdGlmaWNhdGlvbiBhY2NvcmRpbmcgdG8gdGhlIHByb2R1Y3RcbiAgICAgICAgICAgICAgICAgKiB3aGljaCB0aGUgdXNlciBpcyBsb29raW5nIGZvci4gXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAvKiBNYWtpbmcgYSBjb3B5IG9mIG91ciBjdXJyZW50IGFycmF5IG9mIHByb21vdGlvbnMgdG8gYW4gYXV4aWxpYXIgYXJyYXkganVzdFxuICAgICAgICAgICAgICAgICAqIHRvIGtlZXAgaXQgYWxpdmUgZm9yIGEgZnV0dXJlIGNvbXBhcmF0aW9uIGFuZCBkZWZpbmUgd2hpY2ggcm93cyBvZiB0aGUgbGlzdCBhcmVcbiAgICAgICAgICAgICAgICAgKiBhIG5ldyBwcm9tb3Rpb24gYW5kIHRoZW4gdG8gbGlnaHQgaXQgdXAhIFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuYXV4ID0gdGhpcy5wcm9tb3Rpb25zLnNsaWNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge3RoaXMuYXV4ID0gdGhpcy5wcm9tb3Rpb25zLnNsaWNlKCk7fVxuICAgICAgICB9XG5cbiAgICAgIC8qfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwqXG4gICAgICAgKnwgVGhpcyBtZXRob2QgaW1wbGVtZW50cyB0aGUgcGFydCBvZiBub3RpZmljYXRpb25zIHdoaWNoIHdpbGwgYmUgZGlzcGxheWVkIHRvIHVzZXIgbmV3ICB8KlxuICAgICAgICp8IGEgbmV3IHByb21vdGlvbiBhcHBlYXJzIGZvciB0aGUgcHJvZHVjdCB3aGljaCBoZSBpcyBsb29raW5nIGZvci4gICAgICAgICAgICAgICAgICAgICAgfCpcbiAgICAgICAqfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwqL1xuICAgICAgICBwdWJsaWMgc2hvd05vdGlmaWNhdGlvbihsaXN0T2ZOZXdQcm9tb3Rpb25zOmFueVtdKTp2b2lkIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9kdXRvIGJ1c2NhZG86ICcgKyB0aGlzLnF1ZXJ5ICsgJyBudW0uIG5vdmFzIHByb20uOiAnICsgbGlzdE9mTmV3UHJvbW90aW9ucy5sZW5ndGggKyAnIGFsZXJ0YSBzdGF0dXM6ICcgKyB0aGlzLmFsZXJ0SXNPbilcbiAgICAgICAgICAgIC8qIGNoZWNraW5nIHdoZXRoZXIgdXNlciBoYWQgc2V0IGEgcHJvZHVjdCB0byBzZWFyY2ggb24gZmlsdGVyLCB3aGV0aGVyIHRoZXJlJ3NcbiAgICAgICAgICAgICAqIGF0IGxlYXN0IG9uZSBuZXcgcHJvbW8gYW5kIHRoZW4gd2hldGhlciB1c2VyIGhhZCBzZXQgdGhlIGFsZXJ0IG1vZGUgb24uIFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZih0aGlzLnF1ZXJ5ICYmIGxpc3RPZk5ld1Byb21vdGlvbnMubGVuZ3RoID4gMCAmJiB0aGlzLmFsZXJ0SXNPbil7IFxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIHggPSBsaXN0T2ZOZXdQcm9tb3Rpb25zLmxlbmd0aDsgaSA8IHg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvKiBpZGVudGlmeWluZyB3aGV0aGVyIGEgbmV3IHByb21vdGlvbiBtYXRjaGVzIHdpdGggdGhlIHByb2R1Y3Qgd2hpY2ggdGhlIHVzZXJcbiAgICAgICAgICAgICAgICAgICAgICogaXMgbG9va2luZyBmb3IgYW5kIHRoZW4gdG8gc2hvdyBhIG5vdGlmaWNhdGlvbiB0byBoaW0gXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZigobGlzdE9mTmV3UHJvbW90aW9uc1tpXS50aXRsZSkuaW5kZXhPZih0aGlzLnF1ZXJ5KSAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihOb3RpZmljYXRpb24ucGVybWlzc2lvbiAhPT0gJ2dyYW50ZWQnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gbmV3IE5vdGlmaWNhdGlvbiggXCJPcGFhYSFcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IFwiRW5jb250cmFtb3MgdW1hIHByb21vw6fDo28gcGFyYTogXCIgKyB0aGlzLnF1ZXJ5ICsgXCIuIENvcnJlIGzDoSBlIGFwcm92ZWl0YSFcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbiA6IFwiLi4vLi4vYXNzZXRzL2ltZy90ZExvZ29CYWNrZ3JvdW5kLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogbWFrZSBhIG5vaXNlISA7RCAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNvdW5kTm90aWZpY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHBsYXlTb3VuZE5vdGlmaWNhdGlvbigpOiB2b2lkIHtcbiAgICAgICAgICAgIHZhciBzb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiKTtcbiAgICAgICAgICAgIHNvdW5kLnNyYyA9IFwiLi4vLi4vYXNzZXRzL3NvdW5kcy9jYXBpc2NpLm1wM1wiO1xuICAgICAgICAgICAgc291bmQuc2V0QXR0cmlidXRlKFwicHJlbG9hZFwiLFwiYXV0b1wiKTtcbiAgICAgICAgICAgIHNvdW5kLnNldEF0dHJpYnV0ZShcImNvbnRyb2xzXCIsXCJub25lXCIpO1xuICAgICAgICAgICAgc291bmQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzb3VuZCk7XG5cbiAgICAgICAgICAgc291bmQucGxheSgpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5hcHAuY29udHJvbGxlcignUHJvbW9Db250cm9sbGVyJywgWyckc2NvcGUnLCAnJGh0dHAnLCAnJHRpbWVvdXQnLCAnJGludGVydmFsJywgJyRxJywgJyR0cmFuc2xhdGUnLCAnUHJvbW9TZXJ2aWNlJywgVG9tZWRlc2NvbnRvcy5Qcm9tb0NvbnRyb2xsZXJdKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
