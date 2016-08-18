/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class MenuController {

        private promotions: any;
        private saga: any;
        private date: any;
        private s: any;

        constructor(private $scope: ng.IScope, 
            private $http: ng.IHttpService, 
            private $q: ng.IQService, 
            private $translate: ng.translate.ITranslateService,
            private $auth) {
            
        }        
    }
}
app.controller('MenuController', ['$scope', '$http', '$q', '$translate', Tomedescontos.MenuController]);