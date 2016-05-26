/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class PromoController {

        private promotions: any;
        private saga: any;
        private date: any;

        constructor(private $scope: ng.IScope, 
            private $http: ng.IHttpService, 
            private $q: ng.IQService,
            private $stateParams, 
            private $translate: ng.translate.ITranslateService,
            private promoService: PromoService) {
            
            this.findAll();
      
        }
        
        public changeStatus(status): void {
            this.saga = status;
            if(this.saga){
                setInterval(()=>{
                    console.log('chamou!');
                    this.findAll()
                }, 60000);
            }
        }
        
        public findAll(): void {
            this.promoService.pesquisar().then((data) => {
                this.promotions = data;
                console.log('itens atualizados!');
            });
        }
        
    }
}
app.controller('PromoController', ['$scope', '$http', '$q', '$stateParams', '$translate', 'PromoService', Tomedescontos.PromoController]);