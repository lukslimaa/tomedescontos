/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var PromoController = (function () {
        function PromoController($scope, $http, $timeout, $interval, $q, $translate, promoService, notifyService) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$timeout = $timeout;
            this.$interval = $interval;
            this.$q = $q;
            this.$translate = $translate;
            this.promoService = promoService;
            this.notifyService = notifyService;
            /* calling addToHomeScreen script */
            addToHomescreen.removeSession();
            addToHomescreen({
                modal: true,
                maxDisplayCount: 1,
                skipFirstVisit: true
            });
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
                    //this.turnNotificationOn();
                    _this.alertIsOn = true;
                    _this.notifyService.notifyNow("TomeDescontos - Modo de Alerta Ativado!", "Você ativou o modo de alerta para o produto [" + _this.query + "]. Iremos lhe notificar assim que encontrarmos uma promoção.", "http://tomdescontos.com");
                },
                onUnchecked: function () {
                    _this.alertIsOn = false;
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
                        body: "Opa! Fica ligado, pois este alerta aparecerá quando surgir uma nova promoção para o seu produto!",
                        icon: "../../assets/img/tdLogoBackground.png"
                    });
                });
                /* setting true value to the signal variable */
                this.alertIsOn = true;
                /* make a noise! ;D  */
                this.playSoundNotification();
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
                        // if(Notification.permission !== 'granted'){
                        //     Notification.requestPermission();
                        // }
                        // var n = new Notification( "Opaaa!", {
                        //     body: "Encontramos uma promoção para: " + this.query + ". Corre lá e aproveita!", 
                        //     icon : "../../assets/img/tdLogoBackground.png"
                        // });
                        this.notifyService.notifyNow("TomeDescontos - Promoção Encontrada!", "Opa! Encontramos uma nova promoção para [" + this.query + "]! Corre lá e aproveita!", "http://tomdescontos.com");
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
app.controller('PromoController', ['$scope', '$http', '$timeout', '$interval', '$q', '$translate', 'PromoService', 'NotifyService', Tomedescontos.PromoController]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21vTGlzdC9wcm9tb0xpc3QuY3RyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQztBQUVwQyxJQUFPLGFBQWEsQ0FvTm5CO0FBcE5ELFdBQU8sYUFBYSxFQUFDLENBQUM7SUFFbEI7UUFZSSx5QkFBb0IsTUFBaUIsRUFDekIsS0FBc0IsRUFDdEIsUUFBNEIsRUFDNUIsU0FBOEIsRUFDOUIsRUFBZ0IsRUFDaEIsVUFBMEMsRUFDMUMsWUFBMEIsRUFDMUIsYUFBNEI7WUFuQjVDLGlCQWlOQztZQXJNdUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtZQUM1QixjQUFTLEdBQVQsU0FBUyxDQUFxQjtZQUM5QixPQUFFLEdBQUYsRUFBRSxDQUFjO1lBQ2hCLGVBQVUsR0FBVixVQUFVLENBQWdDO1lBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1lBRXBDLG9DQUFvQztZQUNwQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDaEMsZUFBZSxDQUFDO2dCQUNaLEtBQUssRUFBRSxJQUFJO2dCQUNYLGVBQWUsRUFBRSxDQUFDO2dCQUNsQixjQUFjLEVBQUUsSUFBSTthQUN2QixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNkLCtDQUErQztZQUMvQyxJQUFJLENBQUMsY0FBYyxHQUFHO2dCQUNsQixFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztnQkFDbEMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFPLEtBQUssRUFBRSxRQUFRLEVBQUM7Z0JBQ3JDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBUSxLQUFLLEVBQUUsTUFBTSxFQUFDO2dCQUNuQyxFQUFDLElBQUksRUFB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TGlzdC5jdHIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYXBwLmQudHNcIiAvPlxuXG5tb2R1bGUgVG9tZWRlc2NvbnRvcyB7XG5cbiAgICBleHBvcnQgY2xhc3MgUHJvbW9Db250cm9sbGVyIHtcblxuICAgICAgICBwcml2YXRlIHByb21vdGlvbnM6IGFueVtdO1xuICAgICAgICBwcml2YXRlIHNhZ2E6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBkYXRlOiBhbnk7XG4gICAgICAgIHByaXZhdGUgczogYW55O1xuICAgICAgICBwcml2YXRlIHN1Z2dlc3RlZEl0ZW1zOiBhbnlbXTtcbiAgICAgICAgcHJpdmF0ZSBxdWVyeTogYW55O1xuICAgICAgICBwcml2YXRlIGFsZXJ0TWU6IGJvb2xlYW47XG4gICAgICAgIHByaXZhdGUgYXV4OiBhbnlbXTtcbiAgICAgICAgcHJpdmF0ZSBhbGVydElzT246IGJvb2xlYW47XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSwgXG4gICAgICAgICAgICBwcml2YXRlICRodHRwOiBuZy5JSHR0cFNlcnZpY2UsIFxuICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSAkaW50ZXJ2YWw6IG5nLklJbnRlcnZhbFNlcnZpY2UsXG4gICAgICAgICAgICBwcml2YXRlICRxOiBuZy5JUVNlcnZpY2UsIFxuICAgICAgICAgICAgcHJpdmF0ZSAkdHJhbnNsYXRlOiBuZy50cmFuc2xhdGUuSVRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgICAgICAgICBwcml2YXRlIHByb21vU2VydmljZTogUHJvbW9TZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSBub3RpZnlTZXJ2aWNlOiBOb3RpZnlTZXJ2aWNlKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8qIGNhbGxpbmcgYWRkVG9Ib21lU2NyZWVuIHNjcmlwdCAqL1xuICAgICAgICAgICAgYWRkVG9Ib21lc2NyZWVuLnJlbW92ZVNlc3Npb24oKTtcbiAgICAgICAgICAgIGFkZFRvSG9tZXNjcmVlbih7XG4gICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgbWF4RGlzcGxheUNvdW50OiAxLFxuICAgICAgICAgICAgICAgIHNraXBGaXJzdFZpc2l0OiB0cnVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5hbGVydE1lID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmF1eCA9IFtdO1xuICAgICAgICAgICAgLyoqIGRlZmluaW5nIGRlZmF1bHQgbGlzdCBvZiBzdWdnZXN0ZWQgaXRlbXMgKi9cbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGVkSXRlbXMgPSBbXG4gICAgICAgICAgICAgICAge25hbWU6IFwiU21hcnRwaG9uZVwiICxjb2xvcjogXCJyZWRcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiTGl2cm9cIiAgICAgICxjb2xvcjogXCJwdXJwbGVcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiU29mw6FcIiAgICAgICAsY29sb3I6IFwiYmx1ZVwifSxcbiAgICAgICAgICAgICAgICB7bmFtZTogXCJUw6puaXNcIiAgICAgICxjb2xvcjogXCJvcmFuZ2VcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiUmVsw7NnaW9cIiAgICAsY29sb3I6IFwiZ3JleVwifSxcbiAgICAgICAgICAgICAgICB7bmFtZTogXCJQZXJmdW1lXCIgICAgLGNvbG9yOiBcImJyb3duXCJ9LFxuICAgICAgICAgICAgICAgIHtuYW1lOiBcIkdlbGFkZWlyYVwiICAsY29sb3I6IFwiZ3JlZW5cIn1cbiAgICAgICAgICAgIF07ICBcblxuICAgICAgICAgICAgJCgnLmFsZXJ0TWUnKS5jaGVja2JveCh7XG4gICAgICAgICAgICAgICAgb25DaGVja2VkOigpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnR1cm5Ob3RpZmljYXRpb25PbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0SXNPbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5U2VydmljZS5ub3RpZnlOb3coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb21lRGVzY29udG9zIC0gTW9kbyBkZSBBbGVydGEgQXRpdmFkbyFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZvY8OqIGF0aXZvdSBvIG1vZG8gZGUgYWxlcnRhIHBhcmEgbyBwcm9kdXRvIFtcIit0aGlzLnF1ZXJ5K1wiXS4gSXJlbW9zIGxoZSBub3RpZmljYXIgYXNzaW0gcXVlIGVuY29udHJhcm1vcyB1bWEgcHJvbW/Dp8Ojby5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0dHA6Ly90b21kZXNjb250b3MuY29tXCJcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkOigpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0SXNPbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKCcuaGVscC5hbGVydCcpLnBvcHVwKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0F0aXZlIGEgZnVuw6fDo28gXCJBbGVydGUtbWUhXCIgY2FzbyB2b2PDqiBuw6NvIHRlbmhhIGVuY29udHJhZG8gYWluZGEgdW1hIHByb21vw6fDo28gcGFyYScrXG4gICAgICAgICAgICAgICAgICAgICAgICAnIG8gcHJvZHV0byBxdWUgZXN0w6EgcHJvY3VyYW5kbyBvdSBkZXNlamUgbW9uaXRvcsOhLWxvIHBhcmEgZW5jb250cmFyIHVtIHByZcOnbyBhaW5kYScrXG4gICAgICAgICAgICAgICAgICAgICAgICAnIG1haXMgYmFpeG8uJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvbW9TZXJ2aWNlLnBlc3F1aXNhcigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgdGhpcy5wcm9tb3Rpb25zID0gZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb21vTGlzdCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgcHVibGljIHVwZGF0ZVByb21vTGlzdCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuJGludGVydmFsKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9tb1NlcnZpY2UucGVzcXVpc2FyKCkudGhlbigoZGF0YSkgPT4geyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvbW90aW9ucyA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3ROb3RpZmljYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDIwMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRUYWdDb2xvcihjb2xvcik6IGFueXtcbiAgICAgICAgICAgIHJldHVybiBcInVpIFwiICsgY29sb3IgKyBcIiBiYXNpYyB0aW55IGJ1dHRvblwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNlYXJjaFN1Z2dlc3RlZEl0ZW0oaXRlbSk6IHZvaWR7XG4gICAgICAgICAgICAkKCcjZmluZFByb2R1Y3QnKS52YWwoaXRlbSk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gaXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAvKnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18KlxuICAgICAgICp8IFRoaXMgbWV0aG9kIGltcGxlbWVudHMgYSBmdW5jdGlvbiBvZiBjaGVja2luZyB3aGV0aGVyIHVzZXIncyBicm93c2VyIG5vdGlmaWNhdGlvbnMgICAgfCpcbiAgICAgICAqfCBhcmUgYWxsb3dlZC4gT3RoZXJ3aXNlLCBhc2sgdXNlciB0byB0dXJuIGl0IG9uIHRvIHJlY2VpdmUgYWxlcnRzIGZvciBuZXcgcHJvbW90aW9ucy4gIHwqXG4gICAgICAgKnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18Ki9cblxuICAgICAgICBwdWJsaWMgdHVybk5vdGlmaWNhdGlvbk9uKCk6IHZvaWQge1xuICAgICAgICAgICAgdmFyIGNoY2sgPSBOb3RpZmljYXRpb24ucGVybWlzc2lvbjsgXG4gICAgICAgICAgICBpZiggY2hjayA9PT0gJ2RlbmllZCcgfHwgY2hjayA9PT0gJ2RlZmF1bHQnICl7XG5cbiAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24ocGVybWlzc2lvbil7XG4gICAgICAgICAgICAgICAgICAgIG4gPSBuZXcgTm90aWZpY2F0aW9uKCBcIkFsZXJ0YSBUb21lRGVzY29udG9zIVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBcIk9wYSEgRmljYSBsaWdhZG8sIHBvaXMgZXN0ZSBhbGVydGEgYXBhcmVjZXLDoSBxdWFuZG8gc3VyZ2lyIHVtYSBub3ZhIHByb21vw6fDo28gcGFyYSBvIHNldSBwcm9kdXRvIVwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24gOiBcIi4uLy4uL2Fzc2V0cy9pbWcvdGRMb2dvQmFja2dyb3VuZC5wbmdcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qIHNldHRpbmcgdHJ1ZSB2YWx1ZSB0byB0aGUgc2lnbmFsIHZhcmlhYmxlICovIFxuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRJc09uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8qIG1ha2UgYSBub2lzZSEgO0QgICovXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5U291bmROb3RpZmljYXRpb24oKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIGlmKCBjaGNrID09PSAndW5rbm93bicgKXtcbiAgICAgICAgICAgICAgICBhbGVydChcIk9oISBTZXUgYnJvd3NlciBuw6NvIHN1cG9ydGEgZXNzYSBmdW5jaW9uYWxpZGFkZSEgOyhcIikgXG4gICAgICAgICAgICB9IGVsc2Uge3RoaXMuYWxlcnRJc09uID0gdHJ1ZTt9XG4gICAgICAgIH1cblxuICAgICAgLyp8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfCpcbiAgICAgICAqfCBUaGlzIG1ldGhvZCBpcyByZXNwb25zaWJsZSB0byBpZGVudGlmeSBuZXcgcHJvbW90aW9ucyBhbmQgc2V0IGl0cyBcIm5ld1wiIHByb3BlcnR5IGFzICAgfCpcbiAgICAgICAqfCB0cnVlIGluIHRoZSBtYWluIGFycmF5IG9mIHByb21vdGlvbnMuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwqXG4gICAgICAgKnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18Ki9cbiAgICAgICAgcHVibGljIHNob3dQcm9kdWN0Tm90aWZpY2F0aW9uKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy5hdXgubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgICAgICAgICAgLyogY29tcGFyaW5nIG1haW4gbGlzdCB3aGljaCBjb250YWlucyBhbGwgcHJvbW90aW9ucyB3aXRoIGEgY29weSBvZiB0aGUgc2FtZSBsaXN0IFxuICAgICAgICAgICAgICAgICAqIHRoYXQgd2UgZ290IGZvciB0aGUgbGFzdCB0aW1lLiBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnByb21vdGlvbnMuZmlsdGVyKChtYWluTGlzdCk9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV4LmZpbHRlcigoYXV4TGlzdCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYWluTGlzdC50aXRsZSA9PT0gYXV4TGlzdC50aXRsZTtcbiAgICAgICAgICAgICAgICAgICAgfSkubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMucHJvbW90aW9ucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBpbmRlbnRpZnlpbmcgbmV3IHByb21vdGlvbnMgaW4gdGhlIG1haW4gYXJyYXkgb2YgcHJvbW90aW9ucyBhbmQgbWFya2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICogdGhlbSBhcyBuZXcgKHRydWUpIHVzaW5nIGJyYWNrZXQgbm90YXRpb24uIFxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnByb21vdGlvbnNbaV0udGl0bGUgPT09IHJlc3VsdFtqXS50aXRsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9tb3Rpb25zW2ldW1wibmV3XCJdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IHRoaXMucHJvbW90aW9uc1tpXVtcIm5ld1wiXSA9IGZhbHNlO30gXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKiBjYWxsaW5nIG1ldGhvZCByZXNwb25zaWJsZSB0byBzaG93IGEgbm90aWZpY2F0aW9uIGFjY29yZGluZyB0byB0aGUgcHJvZHVjdFxuICAgICAgICAgICAgICAgICAqIHdoaWNoIHRoZSB1c2VyIGlzIGxvb2tpbmcgZm9yLiBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24ocmVzdWx0KTtcblxuICAgICAgICAgICAgICAgIC8qIE1ha2luZyBhIGNvcHkgb2Ygb3VyIGN1cnJlbnQgYXJyYXkgb2YgcHJvbW90aW9ucyB0byBhbiBhdXhpbGlhciBhcnJheSBqdXN0XG4gICAgICAgICAgICAgICAgICogdG8ga2VlcCBpdCBhbGl2ZSBmb3IgYSBmdXR1cmUgY29tcGFyYXRpb24gYW5kIGRlZmluZSB3aGljaCByb3dzIG9mIHRoZSBsaXN0IGFyZVxuICAgICAgICAgICAgICAgICAqIGEgbmV3IHByb21vdGlvbiBhbmQgdGhlbiB0byBsaWdodCBpdCB1cCEgXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5hdXggPSB0aGlzLnByb21vdGlvbnMuc2xpY2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7dGhpcy5hdXggPSB0aGlzLnByb21vdGlvbnMuc2xpY2UoKTt9XG4gICAgICAgIH1cblxuICAgICAgLyp8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfCpcbiAgICAgICAqfCBUaGlzIG1ldGhvZCBpbXBsZW1lbnRzIHRoZSBwYXJ0IG9mIG5vdGlmaWNhdGlvbnMgd2hpY2ggd2lsbCBiZSBkaXNwbGF5ZWQgdG8gdXNlciBuZXcgIHwqXG4gICAgICAgKnwgYSBuZXcgcHJvbW90aW9uIGFwcGVhcnMgZm9yIHRoZSBwcm9kdWN0IHdoaWNoIGhlIGlzIGxvb2tpbmcgZm9yLiAgICAgICAgICAgICAgICAgICAgICB8KlxuICAgICAgICp8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfCovXG4gICAgICAgIHB1YmxpYyBzaG93Tm90aWZpY2F0aW9uKGxpc3RPZk5ld1Byb21vdGlvbnM6YW55W10pOnZvaWQge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2R1dG8gYnVzY2FkbzogJyArIHRoaXMucXVlcnkgKyAnIG51bS4gbm92YXMgcHJvbS46ICcgKyBsaXN0T2ZOZXdQcm9tb3Rpb25zLmxlbmd0aCArICcgYWxlcnRhIHN0YXR1czogJyArIHRoaXMuYWxlcnRJc09uKVxuICAgICAgICAgICAgLyogY2hlY2tpbmcgd2hldGhlciB1c2VyIGhhZCBzZXQgYSBwcm9kdWN0IHRvIHNlYXJjaCBvbiBmaWx0ZXIsIHdoZXRoZXIgdGhlcmUnc1xuICAgICAgICAgICAgICogYXQgbGVhc3Qgb25lIG5ldyBwcm9tbyBhbmQgdGhlbiB3aGV0aGVyIHVzZXIgaGFkIHNldCB0aGUgYWxlcnQgbW9kZSBvbi4gXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmKHRoaXMucXVlcnkgJiYgbGlzdE9mTmV3UHJvbW90aW9ucy5sZW5ndGggPiAwICYmIHRoaXMuYWxlcnRJc09uKXsgXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgeCA9IGxpc3RPZk5ld1Byb21vdGlvbnMubGVuZ3RoOyBpIDwgeDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8qIGlkZW50aWZ5aW5nIHdoZXRoZXIgYSBuZXcgcHJvbW90aW9uIG1hdGNoZXMgd2l0aCB0aGUgcHJvZHVjdCB3aGljaCB0aGUgdXNlclxuICAgICAgICAgICAgICAgICAgICAgKiBpcyBsb29raW5nIGZvciBhbmQgdGhlbiB0byBzaG93IGEgbm90aWZpY2F0aW9uIHRvIGhpbSBcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmKChsaXN0T2ZOZXdQcm9tb3Rpb25zW2ldLnRpdGxlKS5pbmRleE9mKHRoaXMucXVlcnkpICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmKE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uICE9PSAnZ3JhbnRlZCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIG4gPSBuZXcgTm90aWZpY2F0aW9uKCBcIk9wYWFhIVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYm9keTogXCJFbmNvbnRyYW1vcyB1bWEgcHJvbW/Dp8OjbyBwYXJhOiBcIiArIHRoaXMucXVlcnkgKyBcIi4gQ29ycmUgbMOhIGUgYXByb3ZlaXRhIVwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBpY29uIDogXCIuLi8uLi9hc3NldHMvaW1nL3RkTG9nb0JhY2tncm91bmQucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeVNlcnZpY2Uubm90aWZ5Tm93KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVG9tZURlc2NvbnRvcyAtIFByb21vw6fDo28gRW5jb250cmFkYSFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk9wYSEgRW5jb250cmFtb3MgdW1hIG5vdmEgcHJvbW/Dp8OjbyBwYXJhIFtcIiArIHRoaXMucXVlcnkgKyBcIl0hIENvcnJlIGzDoSBlIGFwcm92ZWl0YSFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0dHA6Ly90b21kZXNjb250b3MuY29tXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIG1ha2UgYSBub2lzZSEgO0QgICovXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTb3VuZE5vdGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7ICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwbGF5U291bmROb3RpZmljYXRpb24oKTogdm9pZCB7XG4gICAgICAgICAgICB2YXIgc291bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIik7XG4gICAgICAgICAgICBzb3VuZC5zcmMgPSBcIi4uLy4uL2Fzc2V0cy9zb3VuZHMvY2FwaXNjaS5tcDNcIjtcbiAgICAgICAgICAgIHNvdW5kLnNldEF0dHJpYnV0ZShcInByZWxvYWRcIixcImF1dG9cIik7XG4gICAgICAgICAgICBzb3VuZC5zZXRBdHRyaWJ1dGUoXCJjb250cm9sc1wiLFwibm9uZVwiKTtcbiAgICAgICAgICAgIHNvdW5kLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc291bmQpO1xuXG4gICAgICAgICAgIHNvdW5kLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuYXBwLmNvbnRyb2xsZXIoJ1Byb21vQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRodHRwJywgJyR0aW1lb3V0JywgJyRpbnRlcnZhbCcsICckcScsICckdHJhbnNsYXRlJywgJ1Byb21vU2VydmljZScsICdOb3RpZnlTZXJ2aWNlJywgVG9tZWRlc2NvbnRvcy5Qcm9tb0NvbnRyb2xsZXJdKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
