/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class PromoService {

        //private urlBase = window.location.origin;
        private urlBase = 'http://localhost';
        private promoSelected: any[];

        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService) {

                this.promoSelected = [];

        }

        public pesquisar(): ng.IPromise<any> {
            var defer = this.$q.defer();
            this.$http.get(this.urlBase + ':8081/promos').then((response) => {
                defer.resolve(response.data);
            }, (errResponse) => {
                defer.reject(errResponse);
            });
            return defer.promise;
        }

        public getPromoImages(): ng.IPromise<any> {
            var defer = this.$q.defer();
            this.$http.get(this.urlBase + ':8081/promoImages').then((response) => {
                defer.resolve(response.data);
            }, (errResponse) => {
                defer.reject(errResponse);
            });
            return defer.promise;
        }

        /* this method gets details about promo using buscape api */
        public getPromoDetail(promo: any): ng.IPromise<any> {
            var defer = this.$q.defer();
            this.$http.get(this.urlBase + ':8081/promoDetail/' + promo).then((response) => {
                defer.resolve(response.data);
            }, (errResponse) => {
                defer.reject(errResponse);
            });
            return defer.promise;
        }

        /* This method returns an specific promo which is present in our database. It's query by promo title */
        public findPromoByTitle(title: String): ng.IPromise<any> {
            var defer = this.$q.defer();
            this.$http.get(this.urlBase + ':8081/promo/getPromoByTitle/' + title).then((response) => {
                defer.resolve(response.data);
            }, (errResponse) => {
                defer.reject(errResponse);
            });

            return defer.promise;
        }

        public updatePromoData(newData: any): ng.IPromise<any> {
            var defer = this.$q.defer();
            this.$http.post(this.urlBase + ':8081/promo/update', newData).then((response) => {
                defer.resolve(response.data);
            }, (errResponse) => {
                defer.reject(errResponse);
            });

            return defer.promise;
        }

        

    }
}

app.service("PromoService", ['$http', '$q', Tomedescontos.PromoService]);