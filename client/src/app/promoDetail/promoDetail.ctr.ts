/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class PromoDetailController {

        /* Private variables come here. */
        private promo: any[]= [];
        private title: String = "";
        
        constructor(private $scope: ng.IScope, 
            private $http: ng.IHttpService,
            private $stateParams: any, 
            private $q: ng.IQService, 
            private $translate: ng.translate.ITranslateService,
            private promoService: PromoService) {   

                /* Saving promo title in a short variable. Im' lazy! ;D */            
                this.title = this.$stateParams.title;
                this.promo["shareUrl"] = window.location.href;

                /* (1) retrieving promo data from our database. */
                this.promoService.findPromoByTitle(this.title).then((data)=>{
                    this.promo["url"] = data.url;
                    this.promo["img"] = data.img;
                })

                this.splittingPriceFromTitle(this.title);
                this.promoService.getPromoDetail(this.improvingTheTitle(this.title)).then((data)=>{
                    
                    /* If promo does not have an image set and we found one through buscape api, then
                       set it to image atribute and update it in the database. */
                    if(!this.promo["img"] && data.image) {
                        this.promo["img"] = data.image;

                        /* I'm updating just the promo image at this moment, but I'll update all new data
                        regarding the promo later. */
                        this.promoService.updatePromoData(this.promo);
                    }

                    this.promo["maxPrice"] = data.maxPrice;
                    this.promo["minPrice"] = data.minPrice;
                });
        }

        public improvingTheTitle(title: any): String {

            var result = [];
            /* all regex patterns we will use further */
            var rgx0 = new RegExp("\[.*?\]", "g");
            var rgx1 = new RegExp("(R\$ (\d{1,7}(\.\d{3})*|\d+)(\,\d{2})?)", "g");
            var rgx2 = new RegExp("(R\$(\d{1,7}(\.\d{3})*|\d+)(\,\d{2})?)", "g");
            var rgx3 = new RegExp("[0-9]+(,[0-9]+)", "g");
            var rgx4 = new RegExp("[/!,@#$%^&*'\"+=-]", "g");
            var rgx5 = new RegExp("\(|\)", "g");
            var rgx6 = new RegExp("\s\s+", "g");

            /* removing all texts between brackets */
            if(title.search(rgx0) != -1) { title = title.replace(rgx0, ''); }

            /* removing price tags */
            if(title.search(rgx1) != -1) { title = title.replace(rgx1, ''); }
            if(title.search(rgx2) != -1) { title = title.replace(rgx2, ''); }

            /* removing decimal numbers */
            if(title.search(rgx3) != -1) { title = title.replace(rgx3, ''); }

            /* removing special characters */
            if(title.search(rgx4) != -1) { title = title.replace(rgx4, ''); }
            if(title.search(rgx5) != -1) { title = title.replace(rgx5, ''); }

            /* replacing double whitespaces by single whitespace */
            if(title.search(rgx6) != -1) { title = title.replace(rgx6, ' '); }

            /* splitting the titleand put it into array */
            title = title.trim().split(" ");
            
            /* getting just 5 words at maximum from the title to compose the new title */
            for(var i = 0; i < 7; i++){
                result.push(title[i]);
            }

            return result.join(' ');

        }

        public splittingPriceFromTitle(txt: String): void{
            
            var rgx10 = /(R\$ (\d{1,7}(\.\d{3})*|\d+)(\,\d{2})?)/g;
            var rgx11 = /(R\$(\d{1,7}(\.\d{3})*|\d+)(\,\d{2})?)/g;

            if(txt.search(rgx10) != -1) { 
                this.promo["title"] = txt.replace(rgx10, ''); 
                this.promo["price"] = txt.match(rgx10)[0];
            }

            if(txt.search(rgx11) != -1) { 
                this.promo["title"] = txt.replace(rgx11, '');
                this.promo["price"] = txt.match(rgx11)[0]; 
            }
        }

    }
}
app.controller('PromoDetailController', ['$scope', '$http', '$stateParams', '$q', '$translate', 'PromoService', Tomedescontos.PromoDetailController]);