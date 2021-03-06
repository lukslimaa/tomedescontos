/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var PromoService = (function () {
        function PromoService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            //private urlBase = window.location.origin;
            this.urlBase = 'http://localhost';
        }
        PromoService.prototype.pesquisar = function () {
            var defer = this.$q.defer();
            this.$http.get(this.urlBase + ':8081/promos').then(function (response) {
                defer.resolve(response.data);
            }, function (errResponse) {
                defer.reject(errResponse);
            });
            return defer.promise;
        };
        PromoService.prototype.getPromoImages = function () {
            var defer = this.$q.defer();
            this.$http.get(this.urlBase + ':8081/promoImages').then(function (response) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb21vcy5zZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBRXBDLElBQU8sYUFBYSxDQWlDbkI7QUFqQ0QsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUVsQjtRQUtJLHNCQUFvQixLQUFzQixFQUM5QixFQUFnQjtZQURSLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQzlCLE9BQUUsR0FBRixFQUFFLENBQWM7WUFKNUIsMkNBQTJDO1lBQ25DLFlBQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUtyQyxDQUFDO1FBRU0sZ0NBQVMsR0FBaEI7WUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtnQkFDeEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxFQUFFLFVBQUMsV0FBVztnQkFDWCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDekIsQ0FBQztRQUVNLHFDQUFjLEdBQXJCO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtnQkFDN0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxFQUFFLFVBQUMsV0FBVztnQkFDWCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDekIsQ0FBQztRQUVMLG1CQUFDO0lBQUQsQ0E5QkEsQUE4QkMsSUFBQTtJQTlCWSwwQkFBWSxlQThCeEIsQ0FBQTtBQUNMLENBQUMsRUFqQ00sYUFBYSxLQUFiLGFBQWEsUUFpQ25CO0FBRUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InNlcnZpY2VzL3Byb21vcy5zZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYXBwLmQudHNcIiAvPlxuXG5tb2R1bGUgVG9tZWRlc2NvbnRvcyB7XG5cbiAgICBleHBvcnQgY2xhc3MgUHJvbW9TZXJ2aWNlIHtcblxuICAgICAgICAvL3ByaXZhdGUgdXJsQmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgICAgIHByaXZhdGUgdXJsQmFzZSA9ICdodHRwOi8vbG9jYWxob3N0JztcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBuZy5JSHR0cFNlcnZpY2UsXG4gICAgICAgICAgICBwcml2YXRlICRxOiBuZy5JUVNlcnZpY2UpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHBlc3F1aXNhcigpOiBuZy5JUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgICAgIHZhciBkZWZlciA9IHRoaXMuJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIHRoaXMuJGh0dHAuZ2V0KHRoaXMudXJsQmFzZSArICc6ODA4MS9wcm9tb3MnKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9LCAoZXJyUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoZXJyUmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRQcm9tb0ltYWdlcygpOiBuZy5JUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgICAgIHZhciBkZWZlciA9IHRoaXMuJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIHRoaXMuJGh0dHAuZ2V0KHRoaXMudXJsQmFzZSArICc6ODA4MS9wcm9tb0ltYWdlcycpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH0sIChlcnJSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdChlcnJSZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmFwcC5zZXJ2aWNlKFwiUHJvbW9TZXJ2aWNlXCIsIFsnJGh0dHAnLCAnJHEnLCBUb21lZGVzY29udG9zLlByb21vU2VydmljZV0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
