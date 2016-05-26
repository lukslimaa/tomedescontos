/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class MenuDirective implements ng.IDirective {

        public restrict: string = 'E';
        public templateUrl: string = 'assets/pages/templates/menu.tpl.html';

        constructor(private $http: ng.IHttpService) {

        }

        public static factory($http: ng.IHttpService): MenuDirective {
            return new MenuDirective($http);
        }

    }

}

app.directive('menu', ['$http', Tomedescontos.MenuDirective.factory]);