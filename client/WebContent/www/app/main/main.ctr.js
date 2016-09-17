/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var MainController = (function () {
        function MainController($scope, $http, $q, $translate, promoService) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$q = $q;
            this.$translate = $translate;
            this.promoService = promoService;
            this.promoService.getPromoImages().then(function (data) {
                _this.images = data;
            });
        }
        return MainController;
    }());
    Tomedescontos.MainController = MainController;
})(Tomedescontos || (Tomedescontos = {}));
app.controller('MainController', ['$scope', '$http', '$q', '$translate', 'PromoService', Tomedescontos.MainController]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbWFpbi5jdHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBRXBDLElBQU8sYUFBYSxDQW9CbkI7QUFwQkQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUVsQjtRQU1JLHdCQUFvQixNQUFpQixFQUN6QixLQUFzQixFQUN0QixFQUFnQixFQUNoQixVQUEwQyxFQUMxQyxZQUEwQjtZQVYxQyxpQkFpQkM7WUFYdUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUN0QixPQUFFLEdBQUYsRUFBRSxDQUFjO1lBQ2hCLGVBQVUsR0FBVixVQUFVLENBQWdDO1lBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBRTlCLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDekMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUwscUJBQUM7SUFBRCxDQWpCQSxBQWlCQyxJQUFBO0lBakJZLDRCQUFjLGlCQWlCMUIsQ0FBQTtBQUNMLENBQUMsRUFwQk0sYUFBYSxLQUFiLGFBQWEsUUFvQm5CO0FBQ0QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi9tYWluLmN0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblxuICAgIGV4cG9ydCBjbGFzcyBNYWluQ29udHJvbGxlciB7XG5cbiAgICAgICAgcHJpdmF0ZSBkYXRlOiBhbnk7XG4gICAgICAgIHByaXZhdGUgczogYW55O1xuICAgICAgICBwcml2YXRlIGltYWdlczogYW55W107XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSwgXG4gICAgICAgICAgICBwcml2YXRlICRodHRwOiBuZy5JSHR0cFNlcnZpY2UsIFxuICAgICAgICAgICAgcHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlLCBcbiAgICAgICAgICAgIHByaXZhdGUgJHRyYW5zbGF0ZTogbmcudHJhbnNsYXRlLklUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSBwcm9tb1NlcnZpY2U6IFByb21vU2VydmljZSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvbW9TZXJ2aWNlLmdldFByb21vSW1hZ2VzKCkudGhlbigoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZXMgPSBkYXRhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuXG4gICAgfVxufVxuYXBwLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgWyckc2NvcGUnLCAnJGh0dHAnLCAnJHEnLCAnJHRyYW5zbGF0ZScsICdQcm9tb1NlcnZpY2UnLCBUb21lZGVzY29udG9zLk1haW5Db250cm9sbGVyXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
