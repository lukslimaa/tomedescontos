/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var PromoService = (function () {
        function PromoService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            this.urlBase = window.location.origin;
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
        /* This method is responsible to update some data about an specific promo such as the promo image, minPrice, etc. */
        PromoService.prototype.updatePromoData = function (promo) {
            var defer = this.$q.defer();
            this.$http.post(this.urlBase + ':8081/promo/update', $.param(promo), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            }).then(function (response) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb21vcy5zZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBRXBDLElBQU8sYUFBYSxDQThFbkI7QUE5RUQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUVsQjtRQU1JLHNCQUFvQixLQUFzQixFQUM5QixFQUFnQjtZQURSLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQzlCLE9BQUUsR0FBRixFQUFFLENBQWM7WUFMcEIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBT2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBRWhDLENBQUM7UUFFTSxnQ0FBUyxHQUFoQjtZQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO2dCQUN4RCxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDLEVBQUUsVUFBQyxXQUFXO2dCQUNYLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN6QixDQUFDO1FBRU0scUNBQWMsR0FBckI7WUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO2dCQUM3RCxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDLEVBQUUsVUFBQyxXQUFXO2dCQUNYLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN6QixDQUFDO1FBRUQsNERBQTREO1FBQ3JELHFDQUFjLEdBQXJCLFVBQXNCLEtBQVU7WUFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7Z0JBQ3RFLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUMsRUFBRSxVQUFDLFdBQVc7Z0JBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3pCLENBQUM7UUFFRCx1R0FBdUc7UUFDaEcsdUNBQWdCLEdBQXZCLFVBQXdCLEtBQWE7WUFDakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLDhCQUE4QixHQUFHLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7Z0JBQ2hGLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUMsRUFBRSxVQUFDLFdBQVc7Z0JBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3pCLENBQUM7UUFHRCxvSEFBb0g7UUFDN0csc0NBQWUsR0FBdEIsVUFBdUIsS0FBVTtZQUU3QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRTVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDakUsT0FBTyxFQUFFLEVBQUMsY0FBYyxFQUFFLGtEQUFrRCxFQUFDO2FBQ2hGLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO2dCQUNiLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUMsRUFBRSxVQUFDLFdBQVc7Z0JBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3pCLENBQUM7UUFJTCxtQkFBQztJQUFELENBM0VBLEFBMkVDLElBQUE7SUEzRVksMEJBQVksZUEyRXhCLENBQUE7QUFDTCxDQUFDLEVBOUVNLGFBQWEsS0FBYixhQUFhLFFBOEVuQjtBQUVELEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJzZXJ2aWNlcy9wcm9tb3Muc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2FwcC5kLnRzXCIgLz5cblxubW9kdWxlIFRvbWVkZXNjb250b3Mge1xuXG4gICAgZXhwb3J0IGNsYXNzIFByb21vU2VydmljZSB7XG5cbiAgICAgICAgcHJpdmF0ZSB1cmxCYXNlID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICAgICAgLy9wcml2YXRlIHVybEJhc2UgPSAnaHR0cDovL2xvY2FsaG9zdCc7XG4gICAgICAgIHByaXZhdGUgcHJvbW9TZWxlY3RlZDogYW55W107XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb21vU2VsZWN0ZWQgPSBbXTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHBlc3F1aXNhcigpOiBuZy5JUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgICAgIHZhciBkZWZlciA9IHRoaXMuJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIHRoaXMuJGh0dHAuZ2V0KHRoaXMudXJsQmFzZSArICc6ODA4MS9wcm9tb3MnKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9LCAoZXJyUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoZXJyUmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRQcm9tb0ltYWdlcygpOiBuZy5JUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgICAgIHZhciBkZWZlciA9IHRoaXMuJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIHRoaXMuJGh0dHAuZ2V0KHRoaXMudXJsQmFzZSArICc6ODA4MS9wcm9tb0ltYWdlcycpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH0sIChlcnJSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdChlcnJSZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogdGhpcyBtZXRob2QgZ2V0cyBkZXRhaWxzIGFib3V0IHByb21vIHVzaW5nIGJ1c2NhcGUgYXBpICovXG4gICAgICAgIHB1YmxpYyBnZXRQcm9tb0RldGFpbChwcm9tbzogYW55KTogbmcuSVByb21pc2U8YW55PiB7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSB0aGlzLiRxLmRlZmVyKCk7XG4gICAgICAgICAgICB0aGlzLiRodHRwLmdldCh0aGlzLnVybEJhc2UgKyAnOjgwODEvcHJvbW9EZXRhaWwvJyArIHByb21vKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9LCAoZXJyUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoZXJyUmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gc3BlY2lmaWMgcHJvbW8gd2hpY2ggaXMgcHJlc2VudCBpbiBvdXIgZGF0YWJhc2UuIEl0J3MgcXVlcnkgYnkgcHJvbW8gdGl0bGUgKi9cbiAgICAgICAgcHVibGljIGZpbmRQcm9tb0J5VGl0bGUodGl0bGU6IFN0cmluZyk6IG5nLklQcm9taXNlPGFueT4ge1xuICAgICAgICAgICAgdmFyIGRlZmVyID0gdGhpcy4kcS5kZWZlcigpO1xuICAgICAgICAgICAgdGhpcy4kaHR0cC5nZXQodGhpcy51cmxCYXNlICsgJzo4MDgxL3Byb21vL2dldFByb21vQnlUaXRsZS8nICsgdGl0bGUpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH0sIChlcnJSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdChlcnJSZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qIFRoaXMgbWV0aG9kIGlzIHJlc3BvbnNpYmxlIHRvIHVwZGF0ZSBzb21lIGRhdGEgYWJvdXQgYW4gc3BlY2lmaWMgcHJvbW8gc3VjaCBhcyB0aGUgcHJvbW8gaW1hZ2UsIG1pblByaWNlLCBldGMuICovXG4gICAgICAgIHB1YmxpYyB1cGRhdGVQcm9tb0RhdGEocHJvbW86IGFueSk6IG5nLklQcm9taXNlPGFueT4ge1xuXG4gICAgICAgICAgICB2YXIgZGVmZXIgPSB0aGlzLiRxLmRlZmVyKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuJGh0dHAucG9zdCh0aGlzLnVybEJhc2UgKyAnOjgwODEvcHJvbW8vdXBkYXRlJywgJC5wYXJhbShwcm9tbyksIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnfVxuICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfSwgKGVyclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVqZWN0KGVyclJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuXG4gICAgfVxufVxuXG5hcHAuc2VydmljZShcIlByb21vU2VydmljZVwiLCBbJyRodHRwJywgJyRxJywgVG9tZWRlc2NvbnRvcy5Qcm9tb1NlcnZpY2VdKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
