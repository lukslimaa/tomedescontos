/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class MainController {

        private date: any;
        private s: any;
        private images: any[];

        constructor(private $scope: ng.IScope, 
            private $http: ng.IHttpService, 
            private $q: ng.IQService, 
            private $translate: ng.translate.ITranslateService,
            private promoService: PromoService) {
                
                this.promoService.getPromoImages().then((data)=>{
                    this.images = data;
                });
        } 

    }
}
app.controller('MainController', ['$scope', '$http', '$q', '$translate', 'PromoService', Tomedescontos.MainController]);