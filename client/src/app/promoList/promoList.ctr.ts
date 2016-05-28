/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class PromoController {

        private promotions: any;
        private saga: any;
        private date: any;
        private s: any;

        constructor(private $scope: ng.IScope, 
            private $http: ng.IHttpService, 
            private $timeout: ng.ITimeoutService,
            private $interval: ng.IIntervalService,
            private $q: ng.IQService, 
            private $translate: ng.translate.ITranslateService,
            private promoService: PromoService) {
              
            this.promoService.pesquisar().then((data) => {
                 this.promotions = data;
            });
            
            this.updatePromoList();
        }
        
        
        public updatePromoList(): void {
            this.$interval(()=>{
                this.promoService.pesquisar().then((data) => {
                    this.promotions = data;
                });
            }, 300000);
        }
        
    }
}
app.controller('PromoController', ['$scope', '$http', '$timeout', '$interval', '$q', '$translate', 'PromoService', Tomedescontos.PromoController]);