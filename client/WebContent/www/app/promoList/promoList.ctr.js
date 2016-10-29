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
                maxDisplayCount: 1
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
                    _this.alertIsOn = true;
                    _this.notifyService.notifyNow("TomeDescontos - Modo de Alerta Ativado com Sucesso", "Você ativou o modo de alerta para o produto [" + _this.query + "]." +
                        "Iremos lhe notificar assim que encontrarmos uma promoção.", "http://tomedescontos.com");
                    /* make a noise! */
                    _this.notifyService.playSoundNotification();
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
                        this.notifyService.notifyNow("TomeDescontos - Promoção Encontrada!", "Opa! Encontramos uma nova promoção para [" + this.query + "]! Corre lá e aproveita!", "http://tomedescontos.com");
                        break;
                    }
                }
            }
        };
        return PromoController;
    }());
    Tomedescontos.PromoController = PromoController;
})(Tomedescontos || (Tomedescontos = {}));
app.controller('PromoController', ['$scope', '$http', '$timeout', '$interval', '$q', '$translate', 'PromoService', 'NotifyService', Tomedescontos.PromoController]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21vTGlzdC9wcm9tb0xpc3QuY3RyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQztBQUVwQyxJQUFPLGFBQWEsQ0FnTW5CO0FBaE1ELFdBQU8sYUFBYSxFQUFDLENBQUM7SUFFbEI7UUFZSSx5QkFBb0IsTUFBaUIsRUFDekIsS0FBc0IsRUFDdEIsUUFBNEIsRUFDNUIsU0FBOEIsRUFDOUIsRUFBZ0IsRUFDaEIsVUFBMEMsRUFDMUMsWUFBMEIsRUFDMUIsYUFBNEI7WUFuQjVDLGlCQTZMQztZQWpMdUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtZQUM1QixjQUFTLEdBQVQsU0FBUyxDQUFxQjtZQUM5QixPQUFFLEdBQUYsRUFBRSxDQUFjO1lBQ2hCLGVBQVUsR0FBVixVQUFVLENBQWdDO1lBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1lBRXBDLG9DQUFvQztZQUNwQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDaEMsZUFBZSxDQUFDO2dCQUNaLEtBQUssRUFBRSxJQUFJO2dCQUNYLGVBQWUsRUFBRSxDQUFDO2FBQ3JCLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUc7Z0JBQ2xCLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO2dCQUNsQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQU8sS0FBSyxFQUFFLFFBQVEsRUFBQztnQkFDckMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFRLEtBQUssRUFBRSxNQUFNLEVBQUM7Z0JBQ25DLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBTyxLQUFLLEVBQUUs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QUUxRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FDeEIsc0NBQXNDLEVBQ3RDLDJDQUEyQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsMEJBQTBCLEVBQ3JGLDBCQUEwQixDQUM3QixDQUFDO3dCQUVGLEtBQUssQ0FBQztvQkFDVixDQUFDO2dCQUVMLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0E3TEEsQUE2TEMsSUFBQTtJQTdMWSw2QkFBZSxrQkE2TDNCLENBQUE7QUFDTCxDQUFDLEVBaE1NLGFBQWEsS0FBYixhQUFhLFFBZ01uQjtBQUNELEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InByb21vTGlzdC9wcm9tb0xpc3QuY3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2FwcC5kLnRzXCIgLz5cblxubW9kdWxlIFRvbWVkZXNjb250b3Mge1xuXG4gICAgZXhwb3J0IGNsYXNzIFByb21vQ29udHJvbGxlciB7XG5cbiAgICAgICAgcHJpdmF0ZSBwcm9tb3Rpb25zOiBhbnlbXTtcbiAgICAgICAgcHJpdmF0ZSBzYWdhOiBhbnk7XG4gICAgICAgIHByaXZhdGUgZGF0ZTogYW55O1xuICAgICAgICBwcml2YXRlIHM6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBzdWdnZXN0ZWRJdGVtczogYW55W107XG4gICAgICAgIHByaXZhdGUgcXVlcnk6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBhbGVydE1lOiBib29sZWFuO1xuICAgICAgICBwcml2YXRlIGF1eDogYW55W107XG4gICAgICAgIHByaXZhdGUgYWxlcnRJc09uOiBib29sZWFuO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsIFxuICAgICAgICAgICAgcHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLCBcbiAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgJGludGVydmFsOiBuZy5JSW50ZXJ2YWxTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlLCBcbiAgICAgICAgICAgIHByaXZhdGUgJHRyYW5zbGF0ZTogbmcudHJhbnNsYXRlLklUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSBwcm9tb1NlcnZpY2U6IFByb21vU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgbm90aWZ5U2VydmljZTogTm90aWZ5U2VydmljZSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKiBjYWxsaW5nIGFkZFRvSG9tZVNjcmVlbiBzY3JpcHQgKi9cbiAgICAgICAgICAgIGFkZFRvSG9tZXNjcmVlbi5yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICBhZGRUb0hvbWVzY3JlZW4oe1xuICAgICAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heERpc3BsYXlDb3VudDogMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuYWxlcnRNZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5hdXggPSBbXTtcbiAgICAgICAgICAgIC8qKiBkZWZpbmluZyBkZWZhdWx0IGxpc3Qgb2Ygc3VnZ2VzdGVkIGl0ZW1zICovXG4gICAgICAgICAgICB0aGlzLnN1Z2dlc3RlZEl0ZW1zID0gW1xuICAgICAgICAgICAgICAgIHtuYW1lOiBcIlNtYXJ0cGhvbmVcIiAsY29sb3I6IFwicmVkXCJ9LFxuICAgICAgICAgICAgICAgIHtuYW1lOiBcIkxpdnJvXCIgICAgICAsY29sb3I6IFwicHVycGxlXCJ9LFxuICAgICAgICAgICAgICAgIHtuYW1lOiBcIlNvZsOhXCIgICAgICAgLGNvbG9yOiBcImJsdWVcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiVMOqbmlzXCIgICAgICAsY29sb3I6IFwib3JhbmdlXCJ9LFxuICAgICAgICAgICAgICAgIHtuYW1lOiBcIlJlbMOzZ2lvXCIgICAgLGNvbG9yOiBcImdyZXlcIn0sXG4gICAgICAgICAgICAgICAge25hbWU6IFwiUGVyZnVtZVwiICAgICxjb2xvcjogXCJicm93blwifSxcbiAgICAgICAgICAgICAgICB7bmFtZTogXCJHZWxhZGVpcmFcIiAgLGNvbG9yOiBcImdyZWVuXCJ9XG4gICAgICAgICAgICBdOyAgXG5cbiAgICAgICAgICAgICQoJy5hbGVydE1lJykuY2hlY2tib3goe1xuICAgICAgICAgICAgICAgIG9uQ2hlY2tlZDooKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRJc09uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlTZXJ2aWNlLm5vdGlmeU5vdyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRvbWVEZXNjb250b3MgLSBNb2RvIGRlIEFsZXJ0YSBBdGl2YWRvIGNvbSBTdWNlc3NvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWb2PDqiBhdGl2b3UgbyBtb2RvIGRlIGFsZXJ0YSBwYXJhIG8gcHJvZHV0byBbXCIrdGhpcy5xdWVyeStcIl0uXCIgKyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIklyZW1vcyBsaGUgbm90aWZpY2FyIGFzc2ltIHF1ZSBlbmNvbnRyYXJtb3MgdW1hIHByb21vw6fDo28uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodHRwOi8vdG9tZWRlc2NvbnRvcy5jb21cIlxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIG1ha2UgYSBub2lzZSEgKi9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlTZXJ2aWNlLnBsYXlTb3VuZE5vdGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ6KCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRJc09uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICQoJy5oZWxwLmFsZXJ0JykucG9wdXAoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnQXRpdmUgYSBmdW7Dp8OjbyBcIkFsZXJ0ZS1tZSFcIiBjYXNvIHZvY8OqIG7Do28gdGVuaGEgZW5jb250cmFkbyBhaW5kYSB1bWEgcHJvbW/Dp8OjbyBwYXJhJytcbiAgICAgICAgICAgICAgICAgICAgICAgICcgbyBwcm9kdXRvIHF1ZSBlc3TDoSBwcm9jdXJhbmRvIG91IGRlc2VqZSBtb25pdG9yw6EtbG8gcGFyYSBlbmNvbnRyYXIgdW0gcHJlw6dvIGFpbmRhJytcbiAgICAgICAgICAgICAgICAgICAgICAgICcgbWFpcyBiYWl4by4nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wcm9tb1NlcnZpY2UucGVzcXVpc2FyKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICB0aGlzLnByb21vdGlvbnMgPSBkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvbW9MaXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgdXBkYXRlUHJvbW9MaXN0KCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnByb21vU2VydmljZS5wZXNxdWlzYXIoKS50aGVuKChkYXRhKSA9PiB7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9tb3Rpb25zID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdE5vdGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgMjAwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldFRhZ0NvbG9yKGNvbG9yKTogYW55e1xuICAgICAgICAgICAgcmV0dXJuIFwidWkgXCIgKyBjb2xvciArIFwiIGJhc2ljIHRpbnkgYnV0dG9uXCI7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2VhcmNoU3VnZ2VzdGVkSXRlbShpdGVtKTogdm9pZHtcbiAgICAgICAgICAgICQoJyNmaW5kUHJvZHVjdCcpLnZhbChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgIC8qfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwqXG4gICAgICAgKnwgVGhpcyBtZXRob2QgaW1wbGVtZW50cyBhIGZ1bmN0aW9uIG9mIGNoZWNraW5nIHdoZXRoZXIgdXNlcidzIGJyb3dzZXIgbm90aWZpY2F0aW9ucyAgICB8KlxuICAgICAgICp8IGFyZSBhbGxvd2VkLiBPdGhlcndpc2UsIGFzayB1c2VyIHRvIHR1cm4gaXQgb24gdG8gcmVjZWl2ZSBhbGVydHMgZm9yIG5ldyBwcm9tb3Rpb25zLiAgfCpcbiAgICAgICAqfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwqL1xuXG4gICAgICAgIHB1YmxpYyB0dXJuTm90aWZpY2F0aW9uT24oKTogdm9pZCB7XG4gICAgICAgICAgICB2YXIgY2hjayA9IE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uOyBcbiAgICAgICAgICAgIGlmKCBjaGNrID09PSAnZGVuaWVkJyB8fCBjaGNrID09PSAnZGVmYXVsdCcgKXtcblxuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbihwZXJtaXNzaW9uKXtcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5ldyBOb3RpZmljYXRpb24oIFwiQWxlcnRhIFRvbWVEZXNjb250b3MhXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IFwiT3BhISBGaWNhIGxpZ2FkbywgcG9pcyBlc3RlIGFsZXJ0YSBhcGFyZWNlcsOhIHF1YW5kbyBzdXJnaXIgdW1hIG5vdmEgcHJvbW/Dp8OjbyBwYXJhIG8gc2V1IHByb2R1dG8hXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbiA6IFwiLi4vLi4vYXNzZXRzL2ltZy90ZExvZ29CYWNrZ3JvdW5kLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLyogc2V0dGluZyB0cnVlIHZhbHVlIHRvIHRoZSBzaWduYWwgdmFyaWFibGUgKi8gXG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydElzT24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLyogbWFrZSBhIG5vaXNlISA7RCAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTb3VuZE5vdGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2UgaWYoIGNoY2sgPT09ICd1bmtub3duJyApe1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiT2ghIFNldSBicm93c2VyIG7Do28gc3Vwb3J0YSBlc3NhIGZ1bmNpb25hbGlkYWRlISA7KFwiKSBcbiAgICAgICAgICAgIH0gZWxzZSB7dGhpcy5hbGVydElzT24gPSB0cnVlO31cbiAgICAgICAgfVxuXG4gICAgICAvKnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18KlxuICAgICAgICp8IFRoaXMgbWV0aG9kIGlzIHJlc3BvbnNpYmxlIHRvIGlkZW50aWZ5IG5ldyBwcm9tb3Rpb25zIGFuZCBzZXQgaXRzIFwibmV3XCIgcHJvcGVydHkgYXMgICB8KlxuICAgICAgICp8IHRydWUgaW4gdGhlIG1haW4gYXJyYXkgb2YgcHJvbW90aW9ucy4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCpcbiAgICAgICAqfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwqL1xuICAgICAgICBwdWJsaWMgc2hvd1Byb2R1Y3ROb3RpZmljYXRpb24oKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLmF1eC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgICAgICAgICAgICAvKiBjb21wYXJpbmcgbWFpbiBsaXN0IHdoaWNoIGNvbnRhaW5zIGFsbCBwcm9tb3Rpb25zIHdpdGggYSBjb3B5IG9mIHRoZSBzYW1lIGxpc3QgXG4gICAgICAgICAgICAgICAgICogdGhhdCB3ZSBnb3QgZm9yIHRoZSBsYXN0IHRpbWUuIFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJvbW90aW9ucy5maWx0ZXIoKG1haW5MaXN0KT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hdXguZmlsdGVyKChhdXhMaXN0KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1haW5MaXN0LnRpdGxlID09PSBhdXhMaXN0LnRpdGxlO1xuICAgICAgICAgICAgICAgICAgICB9KS5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9tb3Rpb25zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHJlc3VsdC5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIGluZGVudGlmeWluZyBuZXcgcHJvbW90aW9ucyBpbiB0aGUgbWFpbiBhcnJheSBvZiBwcm9tb3Rpb25zIGFuZCBtYXJraW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGVtIGFzIG5ldyAodHJ1ZSkgdXNpbmcgYnJhY2tldCBub3RhdGlvbi4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucHJvbW90aW9uc1tpXS50aXRsZSA9PT0gcmVzdWx0W2pdLnRpdGxlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb21vdGlvbnNbaV1bXCJuZXdcIl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgdGhpcy5wcm9tb3Rpb25zW2ldW1wibmV3XCJdID0gZmFsc2U7fSBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIGNhbGxpbmcgbWV0aG9kIHJlc3BvbnNpYmxlIHRvIHNob3cgYSBub3RpZmljYXRpb24gYWNjb3JkaW5nIHRvIHRoZSBwcm9kdWN0XG4gICAgICAgICAgICAgICAgICogd2hpY2ggdGhlIHVzZXIgaXMgbG9va2luZyBmb3IuIFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbihyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgLyogTWFraW5nIGEgY29weSBvZiBvdXIgY3VycmVudCBhcnJheSBvZiBwcm9tb3Rpb25zIHRvIGFuIGF1eGlsaWFyIGFycmF5IGp1c3RcbiAgICAgICAgICAgICAgICAgKiB0byBrZWVwIGl0IGFsaXZlIGZvciBhIGZ1dHVyZSBjb21wYXJhdGlvbiBhbmQgZGVmaW5lIHdoaWNoIHJvd3Mgb2YgdGhlIGxpc3QgYXJlXG4gICAgICAgICAgICAgICAgICogYSBuZXcgcHJvbW90aW9uIGFuZCB0aGVuIHRvIGxpZ2h0IGl0IHVwISBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmF1eCA9IHRoaXMucHJvbW90aW9ucy5zbGljZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHt0aGlzLmF1eCA9IHRoaXMucHJvbW90aW9ucy5zbGljZSgpO31cbiAgICAgICAgfVxuXG4gICAgICAvKnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18KlxuICAgICAgICp8IFRoaXMgbWV0aG9kIGltcGxlbWVudHMgdGhlIHBhcnQgb2Ygbm90aWZpY2F0aW9ucyB3aGljaCB3aWxsIGJlIGRpc3BsYXllZCB0byB1c2VyIG5ldyAgfCpcbiAgICAgICAqfCBhIG5ldyBwcm9tb3Rpb24gYXBwZWFycyBmb3IgdGhlIHByb2R1Y3Qgd2hpY2ggaGUgaXMgbG9va2luZyBmb3IuICAgICAgICAgICAgICAgICAgICAgIHwqXG4gICAgICAgKnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18Ki9cbiAgICAgICAgcHVibGljIHNob3dOb3RpZmljYXRpb24obGlzdE9mTmV3UHJvbW90aW9uczphbnlbXSk6dm9pZCB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHJvZHV0byBidXNjYWRvOiAnICsgdGhpcy5xdWVyeSArICcgbnVtLiBub3ZhcyBwcm9tLjogJyArIGxpc3RPZk5ld1Byb21vdGlvbnMubGVuZ3RoICsgJyBhbGVydGEgc3RhdHVzOiAnICsgdGhpcy5hbGVydElzT24pXG4gICAgICAgICAgICAvKiBjaGVja2luZyB3aGV0aGVyIHVzZXIgaGFkIHNldCBhIHByb2R1Y3QgdG8gc2VhcmNoIG9uIGZpbHRlciwgd2hldGhlciB0aGVyZSdzXG4gICAgICAgICAgICAgKiBhdCBsZWFzdCBvbmUgbmV3IHByb21vIGFuZCB0aGVuIHdoZXRoZXIgdXNlciBoYWQgc2V0IHRoZSBhbGVydCBtb2RlIG9uLiBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYodGhpcy5xdWVyeSAmJiBsaXN0T2ZOZXdQcm9tb3Rpb25zLmxlbmd0aCA+IDAgJiYgdGhpcy5hbGVydElzT24peyBcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwLCB4ID0gbGlzdE9mTmV3UHJvbW90aW9ucy5sZW5ndGg7IGkgPCB4OyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLyogaWRlbnRpZnlpbmcgd2hldGhlciBhIG5ldyBwcm9tb3Rpb24gbWF0Y2hlcyB3aXRoIHRoZSBwcm9kdWN0IHdoaWNoIHRoZSB1c2VyXG4gICAgICAgICAgICAgICAgICAgICAqIGlzIGxvb2tpbmcgZm9yIGFuZCB0aGVuIHRvIHNob3cgYSBub3RpZmljYXRpb24gdG8gaGltIFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYoKGxpc3RPZk5ld1Byb21vdGlvbnNbaV0udGl0bGUpLmluZGV4T2YodGhpcy5xdWVyeSkgIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeVNlcnZpY2Uubm90aWZ5Tm93KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVG9tZURlc2NvbnRvcyAtIFByb21vw6fDo28gRW5jb250cmFkYSFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk9wYSEgRW5jb250cmFtb3MgdW1hIG5vdmEgcHJvbW/Dp8OjbyBwYXJhIFtcIiArIHRoaXMucXVlcnkgKyBcIl0hIENvcnJlIGzDoSBlIGFwcm92ZWl0YSFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0dHA6Ly90b21lZGVzY29udG9zLmNvbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuYXBwLmNvbnRyb2xsZXIoJ1Byb21vQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRodHRwJywgJyR0aW1lb3V0JywgJyRpbnRlcnZhbCcsICckcScsICckdHJhbnNsYXRlJywgJ1Byb21vU2VydmljZScsICdOb3RpZnlTZXJ2aWNlJywgVG9tZWRlc2NvbnRvcy5Qcm9tb0NvbnRyb2xsZXJdKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
