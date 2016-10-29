/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var MenuDirective = (function () {
        function MenuDirective($http) {
            this.$http = $http;
            this.restrict = 'E';
            this.templateUrl = 'assets/pages/templates/menu.tpl.html';
        }
        MenuDirective.factory = function ($http) {
            return new MenuDirective($http);
        };
        return MenuDirective;
    }());
    Tomedescontos.MenuDirective = MenuDirective;
})(Tomedescontos || (Tomedescontos = {}));
app.directive('menu', ['$http', Tomedescontos.MenuDirective.factory]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUvbWVudS5kaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBRXBDLElBQU8sYUFBYSxDQWlCbkI7QUFqQkQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUVsQjtRQUtJLHVCQUFvQixLQUFzQjtZQUF0QixVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUhuQyxhQUFRLEdBQVcsR0FBRyxDQUFDO1lBQ3ZCLGdCQUFXLEdBQVcsc0NBQXNDLENBQUM7UUFJcEUsQ0FBQztRQUVhLHFCQUFPLEdBQXJCLFVBQXNCLEtBQXNCO1lBQ3hDLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBRUwsb0JBQUM7SUFBRCxDQWJBLEFBYUMsSUFBQTtJQWJZLDJCQUFhLGdCQWF6QixDQUFBO0FBRUwsQ0FBQyxFQWpCTSxhQUFhLEtBQWIsYUFBYSxRQWlCbkI7QUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoibWVudS9tZW51LmRpci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hcHAuZC50c1wiIC8+XG5cbm1vZHVsZSBUb21lZGVzY29udG9zIHtcblxuICAgIGV4cG9ydCBjbGFzcyBNZW51RGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XG5cbiAgICAgICAgcHVibGljIHJlc3RyaWN0OiBzdHJpbmcgPSAnRSc7XG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ2Fzc2V0cy9wYWdlcy90ZW1wbGF0ZXMvbWVudS50cGwuaHRtbCc7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmFjdG9yeSgkaHR0cDogbmcuSUh0dHBTZXJ2aWNlKTogTWVudURpcmVjdGl2ZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1lbnVEaXJlY3RpdmUoJGh0dHApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cblxuYXBwLmRpcmVjdGl2ZSgnbWVudScsIFsnJGh0dHAnLCBUb21lZGVzY29udG9zLk1lbnVEaXJlY3RpdmUuZmFjdG9yeV0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
