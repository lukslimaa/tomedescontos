/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class MainController {

        private date: any;
        private s: any;

        constructor(private $scope: ng.IScope, 
            private $http: ng.IHttpService, 
            private $q: ng.IQService, 
            private $translate: ng.translate.ITranslateService) {
                 
            
        } 

    }
}
app.controller('MainController', ['$scope', '$http', '$q', '$translate', Tomedescontos.MainController]);