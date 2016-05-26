/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class SidebarDirective implements ng.IDirective {

        public restrict: string = 'E';
        public templateUrl: string = 'assets/pages/templates/sidebar.tpl.html';

        constructor(private $http: ng.IHttpService) {

        }

        public static factory($http: ng.IHttpService): SidebarDirective {
            return new SidebarDirective($http);
        }

    } 

}

app.directive('sidebar', ['$http', Tomedescontos.SidebarDirective.factory]);