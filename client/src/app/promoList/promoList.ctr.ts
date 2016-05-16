/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class PromoController {

        private promotions: any;

        constructor(private $scope: ng.IScope, 
            private $http: ng.IHttpService, 
            private $q: ng.IQService,
            private $stateParams, 
            private $translate: ng.translate.ITranslateService,
            private promoService: PromoService) {
            
            
            this.promoService.pesquisar().then((data) => {
                this.promotions = data;
            });
        }
    }
}
app.controller('PromoController', ['$scope', '$http', '$q', '$stateParams', '$translate', 'PromoService', Tomedescontos.PromoController]);