/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var SidebarDirective = (function () {
        function SidebarDirective($http) {
            this.$http = $http;
            this.restrict = 'E';
            this.templateUrl = 'assets/pages/templates/sidebar.tpl.html';
        }
        SidebarDirective.factory = function ($http) {
            return new SidebarDirective($http);
        };
        return SidebarDirective;
    }());
    Tomedescontos.SidebarDirective = SidebarDirective;
})(Tomedescontos || (Tomedescontos = {}));
app.directive('sidebar', ['$http', Tomedescontos.SidebarDirective.factory]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGViYXIvc2lkZWJhci5kaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBRXBDLElBQU8sYUFBYSxDQWlCbkI7QUFqQkQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUVsQjtRQUtJLDBCQUFvQixLQUFzQjtZQUF0QixVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUhuQyxhQUFRLEdBQVcsR0FBRyxDQUFDO1lBQ3ZCLGdCQUFXLEdBQVcseUNBQXlDLENBQUM7UUFJdkUsQ0FBQztRQUVhLHdCQUFPLEdBQXJCLFVBQXNCLEtBQXNCO1lBQ3hDLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFTCx1QkFBQztJQUFELENBYkEsQUFhQyxJQUFBO0lBYlksOEJBQWdCLG1CQWE1QixDQUFBO0FBRUwsQ0FBQyxFQWpCTSxhQUFhLEtBQWIsYUFBYSxRQWlCbkI7QUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJzaWRlYmFyL3NpZGViYXIuZGlyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2FwcC5kLnRzXCIgLz5cblxubW9kdWxlIFRvbWVkZXNjb250b3Mge1xuXG4gICAgZXhwb3J0IGNsYXNzIFNpZGViYXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcblxuICAgICAgICBwdWJsaWMgcmVzdHJpY3Q6IHN0cmluZyA9ICdFJztcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSAnYXNzZXRzL3BhZ2VzL3RlbXBsYXRlcy9zaWRlYmFyLnRwbC5odG1sJztcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBuZy5JSHR0cFNlcnZpY2UpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBmYWN0b3J5KCRodHRwOiBuZy5JSHR0cFNlcnZpY2UpOiBTaWRlYmFyRGlyZWN0aXZlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2lkZWJhckRpcmVjdGl2ZSgkaHR0cCk7XG4gICAgICAgIH1cblxuICAgIH0gXG5cbn1cblxuYXBwLmRpcmVjdGl2ZSgnc2lkZWJhcicsIFsnJGh0dHAnLCBUb21lZGVzY29udG9zLlNpZGViYXJEaXJlY3RpdmUuZmFjdG9yeV0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
