/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var PromoService = (function () {
        function PromoService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        PromoService.prototype.pesquisar = function () {
            var defer = this.$q.defer();
            this.$http.get('http://localhost:8081/promos').then(function (response) {
                defer.resolve(response.data);
            }, function (errResponse) {
                defer.reject(errResponse);
            });
            return defer.promise;
        };
        return PromoService;
    }());
    Tomedescontos.PromoService = PromoService;
})(Tomedescontos || (Tomedescontos = {}));
app.service("PromoService", ['$http', '$q', Tomedescontos.PromoService]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb21vcy5zZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBRXBDLElBQU8sYUFBYSxDQW1CbkI7QUFuQkQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUVsQjtRQUVJLHNCQUFvQixLQUFzQixFQUM5QixFQUFnQjtZQURSLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQzlCLE9BQUUsR0FBRixFQUFFLENBQWM7UUFFNUIsQ0FBQztRQUVNLGdDQUFTLEdBQWhCO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7Z0JBQ3pELEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUMsRUFBRSxVQUFDLFdBQVc7Z0JBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3pCLENBQUM7UUFDTCxtQkFBQztJQUFELENBaEJBLEFBZ0JDLElBQUE7SUFoQlksMEJBQVksZUFnQnhCLENBQUE7QUFDTCxDQUFDLEVBbkJNLGFBQWEsS0FBYixhQUFhLFFBbUJuQjtBQUVELEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJzZXJ2aWNlcy9wcm9tb3Muc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2FwcC5kLnRzXCIgLz5cblxubW9kdWxlIFRvbWVkZXNjb250b3Mge1xuXG4gICAgZXhwb3J0IGNsYXNzIFByb21vU2VydmljZSB7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwZXNxdWlzYXIoKTogbmcuSVByb21pc2U8YW55PiB7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSB0aGlzLiRxLmRlZmVyKCk7XG4gICAgICAgICAgICB0aGlzLiRodHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDo4MDgxL3Byb21vcycpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH0sIChlcnJSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdChlcnJSZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5hcHAuc2VydmljZShcIlByb21vU2VydmljZVwiLCBbJyRodHRwJywgJyRxJywgVG9tZWRlc2NvbnRvcy5Qcm9tb1NlcnZpY2VdKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
