/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var PromoService = (function () {
        function PromoService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            //private urlBase = window.location.origin;
            this.urlBase = 'http://localhost';
            this.promoSelected = [];
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
        /* this method gets details about promo using buscape api */
        PromoService.prototype.getPromoDetail = function (promo) {
            var defer = this.$q.defer();
            this.$http.get(this.urlBase + ':8081/promoDetail/' + promo).then(function (response) {
                defer.resolve(response.data);
            }, function (errResponse) {
                defer.reject(errResponse);
            });
            return defer.promise;
        };
        /* This method returns an specific promo which is present in our database. It's query by promo title */
        PromoService.prototype.findPromoByTitle = function (title) {
            var defer = this.$q.defer();
            this.$http.get(this.urlBase + ':8081/promo/getPromoByTitle/' + title).then(function (response) {
                defer.resolve(response.data);
            }, function (errResponse) {
                defer.reject(errResponse);
            });
            return defer.promise;
        };
        PromoService.prototype.updatePromoData = function (newData) {
            var defer = this.$q.defer();
            this.$http.post(this.urlBase + ':8081/promo/update', newData).then(function (response) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb21vcy5zZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBRXBDLElBQU8sYUFBYSxDQXdFbkI7QUF4RUQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUVsQjtRQU1JLHNCQUFvQixLQUFzQixFQUM5QixFQUFnQjtZQURSLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQzlCLE9BQUUsR0FBRixFQUFFLENBQWM7WUFMNUIsMkNBQTJDO1lBQ25DLFlBQU8sR0FBRyxrQkFBa0IsQ0FBQztZQU03QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUVoQyxDQUFDO1FBRU0sZ0NBQVMsR0FBaEI7WUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtnQkFDeEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxFQUFFLFVBQUMsV0FBVztnQkFDWCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDekIsQ0FBQztRQUVNLHFDQUFjLEdBQXJCO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtnQkFDN0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxFQUFFLFVBQUMsV0FBVztnQkFDWCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDekIsQ0FBQztRQUVELDREQUE0RDtRQUNyRCxxQ0FBYyxHQUFyQixVQUFzQixLQUFVO1lBQzVCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO2dCQUN0RSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDLEVBQUUsVUFBQyxXQUFXO2dCQUNYLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN6QixDQUFDO1FBRUQsdUdBQXVHO1FBQ2hHLHVDQUFnQixHQUF2QixVQUF3QixLQUFhO1lBQ2pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyw4QkFBOEIsR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO2dCQUNoRixLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDLEVBQUUsVUFBQyxXQUFXO2dCQUNYLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN6QixDQUFDO1FBRU0sc0NBQWUsR0FBdEIsVUFBdUIsT0FBWTtZQUMvQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtnQkFDeEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxFQUFFLFVBQUMsV0FBVztnQkFDWCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDekIsQ0FBQztRQUlMLG1CQUFDO0lBQUQsQ0FyRUEsQUFxRUMsSUFBQTtJQXJFWSwwQkFBWSxlQXFFeEIsQ0FBQTtBQUNMLENBQUMsRUF4RU0sYUFBYSxLQUFiLGFBQWEsUUF3RW5CO0FBRUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InNlcnZpY2VzL3Byb21vcy5zZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYXBwLmQudHNcIiAvPlxuXG5tb2R1bGUgVG9tZWRlc2NvbnRvcyB7XG5cbiAgICBleHBvcnQgY2xhc3MgUHJvbW9TZXJ2aWNlIHtcblxuICAgICAgICAvL3ByaXZhdGUgdXJsQmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgICAgIHByaXZhdGUgdXJsQmFzZSA9ICdodHRwOi8vbG9jYWxob3N0JztcbiAgICAgICAgcHJpdmF0ZSBwcm9tb1NlbGVjdGVkOiBhbnlbXTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBuZy5JSHR0cFNlcnZpY2UsXG4gICAgICAgICAgICBwcml2YXRlICRxOiBuZy5JUVNlcnZpY2UpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvbW9TZWxlY3RlZCA9IFtdO1xuXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcGVzcXVpc2FyKCk6IG5nLklQcm9taXNlPGFueT4ge1xuICAgICAgICAgICAgdmFyIGRlZmVyID0gdGhpcy4kcS5kZWZlcigpO1xuICAgICAgICAgICAgdGhpcy4kaHR0cC5nZXQodGhpcy51cmxCYXNlICsgJzo4MDgxL3Byb21vcycpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH0sIChlcnJSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdChlcnJSZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldFByb21vSW1hZ2VzKCk6IG5nLklQcm9taXNlPGFueT4ge1xuICAgICAgICAgICAgdmFyIGRlZmVyID0gdGhpcy4kcS5kZWZlcigpO1xuICAgICAgICAgICAgdGhpcy4kaHR0cC5nZXQodGhpcy51cmxCYXNlICsgJzo4MDgxL3Byb21vSW1hZ2VzJykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfSwgKGVyclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVqZWN0KGVyclJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvKiB0aGlzIG1ldGhvZCBnZXRzIGRldGFpbHMgYWJvdXQgcHJvbW8gdXNpbmcgYnVzY2FwZSBhcGkgKi9cbiAgICAgICAgcHVibGljIGdldFByb21vRGV0YWlsKHByb21vOiBhbnkpOiBuZy5JUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgICAgIHZhciBkZWZlciA9IHRoaXMuJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIHRoaXMuJGh0dHAuZ2V0KHRoaXMudXJsQmFzZSArICc6ODA4MS9wcm9tb0RldGFpbC8nICsgcHJvbW8pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH0sIChlcnJSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdChlcnJSZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBzcGVjaWZpYyBwcm9tbyB3aGljaCBpcyBwcmVzZW50IGluIG91ciBkYXRhYmFzZS4gSXQncyBxdWVyeSBieSBwcm9tbyB0aXRsZSAqL1xuICAgICAgICBwdWJsaWMgZmluZFByb21vQnlUaXRsZSh0aXRsZTogU3RyaW5nKTogbmcuSVByb21pc2U8YW55PiB7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSB0aGlzLiRxLmRlZmVyKCk7XG4gICAgICAgICAgICB0aGlzLiRodHRwLmdldCh0aGlzLnVybEJhc2UgKyAnOjgwODEvcHJvbW8vZ2V0UHJvbW9CeVRpdGxlLycgKyB0aXRsZSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfSwgKGVyclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVqZWN0KGVyclJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB1cGRhdGVQcm9tb0RhdGEobmV3RGF0YTogYW55KTogbmcuSVByb21pc2U8YW55PiB7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSB0aGlzLiRxLmRlZmVyKCk7XG4gICAgICAgICAgICB0aGlzLiRodHRwLnBvc3QodGhpcy51cmxCYXNlICsgJzo4MDgxL3Byb21vL3VwZGF0ZScsIG5ld0RhdGEpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH0sIChlcnJSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdChlcnJSZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICBcblxuICAgIH1cbn1cblxuYXBwLnNlcnZpY2UoXCJQcm9tb1NlcnZpY2VcIiwgWyckaHR0cCcsICckcScsIFRvbWVkZXNjb250b3MuUHJvbW9TZXJ2aWNlXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
