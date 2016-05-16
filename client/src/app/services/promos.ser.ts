/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class PromoService {

        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService) {

        }

        public pesquisar(): ng.IPromise<any> {
            var defer = this.$q.defer();
            this.$http.get('http://localhost:8081/promos').then((response) => {
                defer.resolve(response.data);
            }, (errResponse) => {
                defer.reject(errResponse);
            });
            return defer.promise;
        }
    }
}

app.service("PromoService", ['$http', '$q', Tomedescontos.PromoService]);