/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var PromoService = (function () {
        function PromoService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            // private urlBase = window.location.origin;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb21vcy5zZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBRXBDLElBQU8sYUFBYSxDQWlDbkI7QUFqQ0QsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUVsQjtRQUtJLHNCQUFvQixLQUFzQixFQUM5QixFQUFnQjtZQURSLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQzlCLE9BQUUsR0FBRixFQUFFLENBQWM7WUFKNUIsNENBQTRDO1lBQ3BDLFlBQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUtyQyxDQUFDO1FBRU0sZ0NBQVMsR0FBaEI7WUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtnQkFDeEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxFQUFFLFVBQUMsV0FBVztnQkFDWCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDekIsQ0FBQztRQUVNLHFDQUFjLEdBQXJCO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtnQkFDN0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxFQUFFLFVBQUMsV0FBVztnQkFDWCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDekIsQ0FBQztRQUVMLG1CQUFDO0lBQUQsQ0E5QkEsQUE4QkMsSUFBQTtJQTlCWSwwQkFBWSxlQThCeEIsQ0FBQTtBQUNMLENBQUMsRUFqQ00sYUFBYSxLQUFiLGFBQWEsUUFpQ25CO0FBRUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InNlcnZpY2VzL3Byb21vcy5zZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYXBwLmQudHNcIiAvPlxuXG5tb2R1bGUgVG9tZWRlc2NvbnRvcyB7XG5cbiAgICBleHBvcnQgY2xhc3MgUHJvbW9TZXJ2aWNlIHtcblxuICAgICAgICAvLyBwcml2YXRlIHVybEJhc2UgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICAgICAgICBwcml2YXRlIHVybEJhc2UgPSAnaHR0cDovL2xvY2FsaG9zdCc7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwZXNxdWlzYXIoKTogbmcuSVByb21pc2U8YW55PiB7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSB0aGlzLiRxLmRlZmVyKCk7XG4gICAgICAgICAgICB0aGlzLiRodHRwLmdldCh0aGlzLnVybEJhc2UgKyAnOjgwODEvcHJvbW9zJykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfSwgKGVyclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVqZWN0KGVyclJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0UHJvbW9JbWFnZXMoKTogbmcuSVByb21pc2U8YW55PiB7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSB0aGlzLiRxLmRlZmVyKCk7XG4gICAgICAgICAgICB0aGlzLiRodHRwLmdldCh0aGlzLnVybEJhc2UgKyAnOjgwODEvcHJvbW9JbWFnZXMnKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9LCAoZXJyUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoZXJyUmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5hcHAuc2VydmljZShcIlByb21vU2VydmljZVwiLCBbJyRodHRwJywgJyRxJywgVG9tZWRlc2NvbnRvcy5Qcm9tb1NlcnZpY2VdKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
