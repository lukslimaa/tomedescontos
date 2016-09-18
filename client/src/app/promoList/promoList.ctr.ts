/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class PromoController {

        private promotions: any[];
        private saga: any;
        private date: any;
        private s: any;
        private suggestedItems: any[];
        private query: any;
        private alertMe: boolean;
        private aux: any[];
        private alertIsOn: boolean;

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
                onChecked:() => {
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
                    this.showProductNotification();
                });
            }, 20000);
        }

        public setTagColor(color): any{
            return "ui " + color + " basic tiny button";
        }

        public searchSuggestedItem(item): void{
            $('#findProduct').val(item);
            this.query = item;
        }

      /*|---------------------------------------------------------------------------------------|*
       *| This method implements a function of checking whether user's browser notifications    |*
       *| are allowed. Otherwise, ask user to turn it on to receive alerts for new promotions.  |*
       *|---------------------------------------------------------------------------------------|*/

        public turnNotificationOn(): void {
            var chck = Notification.permission; 
            if( chck === 'denied' || chck === 'default' ){

                Notification.requestPermission(function(permission){
                    n = new Notification( "Alerta TomeDescontos!", {
                        body: "Este alerta aparecerá quando uma nova promoção aparecer para o seu produto!", 
                        icon : "../../assets/img/tdLogoBackground.png"
                    });
                });

                /* setting true value to the signal variable */ 
                this.alertIsOn = true;
            } 
            else if( chck === 'unknown' ){
                alert("Oh! Seu browser não suporta essa funcionalidade! ;(") 
            } else {this.alertIsOn = true;}
        }

      /*|---------------------------------------------------------------------------------------|*
       *| This method is responsible to identify new promotions and set its "new" property as   |*
       *| true in the main array of promotions.                                                 |*
       *|---------------------------------------------------------------------------------------|*/
        public showProductNotification(): void {
            if(this.aux.length > 0){
                var result = [];

                /* comparing main list which contains all promotions with a copy of the same list 
                 * that we got for the last time. 
                 */
                result = this.promotions.filter((mainList)=>{
                    return this.aux.filter((auxList)=>{
                        return mainList.title === auxList.title;
                    }).length === 0;
                });

                for(var i = 0; i < this.promotions.length; i++){
                    for(var j = 0; j < result.length; j++){
                        
                        /* indentifying new promotions in the main array of promotions and marking
                         * them as new (true) using bracket notation. 
                         */
                        if(this.promotions[i].title === result[j].title){
                            this.promotions[i]["new"] = true;
                        } else { this.promotions[i]["new"] = false;} 
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
            } else {this.aux = this.promotions.slice();}
        }

      /*|---------------------------------------------------------------------------------------|*
       *| This method implements the part of notifications which will be displayed to user new  |*
       *| a new promotion appears for the product which he is looking for.                      |*
       *|---------------------------------------------------------------------------------------|*/
        public showNotification(listOfNewPromotions:any[]):void {
            console.log('produto buscado: ' + this.query + ' num. novas prom.: ' + listOfNewPromotions.length + ' alerta status: ' + this.alertIsOn)
            /* checking whether user had set a product to search on filter, whether there's
             * at least one new promo and then whether user had set the alert mode on. 
             */
            if(this.query && listOfNewPromotions.length > 0 && this.alertIsOn){ 
                for(var i = 0, x = listOfNewPromotions.length; i < x; i++){
                    
                    /* identifying whether a new promotion matches with the product which the user
                     * is looking for and then to show a notification to him 
                     */
                    if((listOfNewPromotions[i].title).indexOf(this.query) !== -1){
                        
                        if(Notification.permission !== 'granted'){
                            Notification.requestPermission();
                        }
                        var n = new Notification( "Opaaa!", {
                            body: "Encontramos uma promoção para: " + this.query + ". Corre lá e aproveita!", 
                            icon : "../../assets/img/tdLogoBackground.png"
                        });

                        /* make a noise! ;D  */
                        this.playSoundNotification();
                        break;    
                    }
                    
                }
            }
        }

        public playSoundNotification(): void {
            var sound = document.createElement("audio");
            sound.src = "../../assets/sounds/capisci.mp3";
            sound.setAttribute("preload","auto");
            sound.setAttribute("controls","none");
            sound.style.display = "none";
            document.body.appendChild(sound);

           sound.play();
        }

    }
}
app.controller('PromoController', ['$scope', '$http', '$timeout', '$interval', '$q', '$translate', 'PromoService', Tomedescontos.PromoController]);