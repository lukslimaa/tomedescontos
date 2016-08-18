/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class PromoController {

        private promotions: any;
        private saga: any;
        private date: any;
        private s: any;
        private suggestedItems: any[];
        private query: any;
        private alertMe: boolean;
        private aux: any[];

        constructor(private $scope: ng.IScope, 
            private $http: ng.IHttpService, 
            private $timeout: ng.ITimeoutService,
            private $interval: ng.IIntervalService,
            private $q: ng.IQService, 
            private $translate: ng.translate.ITranslateService,
            private promoService: PromoService) {
            
            this.alertMe = false;
            this.aux = [];
            /** defining default list of suggested items */
            this.suggestedItems = [
                {name: "Smartphone" ,color: "red"},
                {name: "Livro"      ,color: "purple"},
                {name: "Sofá"       ,color: "blue"},
                {name: "Tênis"      ,color: "orange"},
                {name: "Relógio"    ,color: "grey"},
                {name: "Perfume"    ,color: "brown"},
                {name: "Geladeira"  ,color: "green"}
            ];  

            $('.alertMe').checkbox({
                onChecked: => {
                    this.turnNotificationOn();
                }
            });
            
            $('.help.alert').popup({
                title: 'Ative a função "Alerte-me!" caso você não tenha encontrado ainda uma promoção para'+
                        ' o produto que está procurando ou deseje monitorá-lo para encontrar um preço ainda'+
                        ' mais baixo.'
            });

            this.promoService.pesquisar().then((data) => {
                 this.promotions = data;
            });
            
            this.updatePromoList();
        }
        
        
        public updatePromoList(): void {
            this.$interval(()=>{
                this.promoService.pesquisar().then((data) => {                    
                    this.promotions = data;
                    this.showProductNotification(this.promotions, this.query);
                });
            }, 60000);
        }

        public setTagColor(color): any{
            return "ui " + color + " basic tiny button";
        }

        public searchSuggestedItem(item): void{
            $('#findProduct').val(item);
            this.query = item;
        }

        public turnNotificationOn(): void {
            var chck = Notification.permission; 
            if( chck === 'denied' || chck === 'default' ){
                Notification.requestPermission(function(permission){
                    n = new Notification( "Alerta TomeDescontos!", {
                        body: "Este alerta aparecerá quando uma nova promoção aparecer para o seu produto!", 
                        icon : "../../assets/img/tdLogoBackground.png"
                    });
                }); 
            }
            else if( chck === 'unknown' ){
                alert("Oh! Seu browser não suporta essa funcionalidade! ;(") 
            }
        }

        public showProductNotification(list, product): void {
            var filteredList = [];

            if(product){

                /** checking if exists the product in the general array which contains all promotions */
                for(var i = 0; i < list.length; i++){
                    var title = list[i].title.toLowerCase();
                    if(title.indexOf(product.toLowerCase()) != -1){
                        filteredList.push(list[i]);
                    }
                }
                console.log('filtered: ' + filteredList.length + ' aux: ' + this.aux.length);
                /** comparing the filtered list length to  */
                if(filteredList.length > this.aux.length){
                    for(var j = 0; j < filteredList.length; j++){
                        if(($.inArray(filteredList[j].title, this.aux)) === -1){
                            filteredList[j]["new"] = true;
                        }
                    }
                    console.log(filteredList);
                    
                    /** copying the filteredList array to aux */                
                    this.aux = filteredList.slice();
                }
            }
        }
    }
}
app.controller('PromoController', ['$scope', '$http', '$timeout', '$interval', '$q', '$translate', 'PromoService', Tomedescontos.PromoController]);