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
            OneSignal.sendSelfNotification(
            /* Title (defaults if unset) */
            "OneSignal Web Push Notification", 
            /* Message (defaults if unset) */
            "Action buttons increase the ways your users can interact with your notification.", 
            /* URL (defaults if unset) */
            'https://example.com/?_osp=do_not_open', 
            /* Icon */
            'https://onesignal.com/images/notification_logo.png', {
                /* Additional data hash */
                notificationType: 'news-feature'
            }, [{
                    /* Choose any unique identifier for your button. The ID of the clicked button is passed to you so you can identify which button is clicked */
                    id: 'like-button',
                    /* The text the button should display. Supports emojis. */
                    text: 'Like',
                    /* A valid publicly reachable URL to an icon. Keep this small because it's downloaded on each notification display. */
                    icon: 'http://i.imgur.com/N8SN8ZS.png',
                    /* The URL to open when this action button is clicked. See the sections below for special URLs that prevent opening any window. */
                    url: 'https://example.com/?_osp=do_not_open'
                },
                {
                    id: 'read-more-button',
                    text: 'Read more',
                    icon: 'http://i.imgur.com/MIxJp1L.png',
                    url: 'https://example.com/?_osp=do_not_open'
                }]);
        }
        return MainController;
    }());
    Tomedescontos.MainController = MainController;
})(Tomedescontos || (Tomedescontos = {}));
app.controller('MainController', ['$scope', '$http', '$q', '$translate', 'PromoService', Tomedescontos.MainController]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbWFpbi5jdHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBRXBDLElBQU8sYUFBYSxDQXNEbkI7QUF0REQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUVsQjtRQU1JLHdCQUFvQixNQUFpQixFQUN6QixLQUFzQixFQUN0QixFQUFnQixFQUNoQixVQUEwQyxFQUMxQyxZQUEwQjtZQVYxQyxpQkFtREM7WUE3Q3VCLFdBQU0sR0FBTixNQUFNLENBQVc7WUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7WUFDdEIsT0FBRSxHQUFGLEVBQUUsQ0FBYztZQUNoQixlQUFVLEdBQVYsVUFBVSxDQUFnQztZQUMxQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztZQUU5QixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ3pDLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBRUgsU0FBUyxDQUFDLG9CQUFvQjtZQUM1QywrQkFBK0I7WUFDL0IsaUNBQWlDO1lBQ2pDLGlDQUFpQztZQUNqQyxrRkFBa0Y7WUFDakYsNkJBQTZCO1lBQzlCLHVDQUF1QztZQUN2QyxVQUFVO1lBQ1Ysb0RBQW9ELEVBQ3BEO2dCQUNFLDBCQUEwQjtnQkFDMUIsZ0JBQWdCLEVBQUUsY0FBYzthQUNqQyxFQUNELENBQUM7b0JBQ0MsNklBQTZJO29CQUM3SSxFQUFFLEVBQUUsYUFBYTtvQkFDakIsMERBQTBEO29CQUMxRCxJQUFJLEVBQUUsTUFBTTtvQkFDWixzSEFBc0g7b0JBQ3RILElBQUksRUFBRSxnQ0FBZ0M7b0JBQ3RDLGtJQUFrSTtvQkFDbEksR0FBRyxFQUFFLHVDQUF1QztpQkFDN0M7Z0JBQ0Q7b0JBQ0UsRUFBRSxFQUFFLGtCQUFrQjtvQkFDdEIsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxnQ0FBZ0M7b0JBQ3RDLEdBQUcsRUFBRSx1Q0FBdUM7aUJBQzdDLENBQUMsQ0FDSCxDQUFDO1FBSU0sQ0FBQztRQUVMLHFCQUFDO0lBQUQsQ0FuREEsQUFtREMsSUFBQTtJQW5EWSw0QkFBYyxpQkFtRDFCLENBQUE7QUFDTCxDQUFDLEVBdERNLGFBQWEsS0FBYixhQUFhLFFBc0RuQjtBQUNELEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4vbWFpbi5jdHIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYXBwLmQudHNcIiAvPlxuXG5tb2R1bGUgVG9tZWRlc2NvbnRvcyB7XG5cbiAgICBleHBvcnQgY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xuXG4gICAgICAgIHByaXZhdGUgZGF0ZTogYW55O1xuICAgICAgICBwcml2YXRlIHM6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBpbWFnZXM6IGFueVtdO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsIFxuICAgICAgICAgICAgcHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLCBcbiAgICAgICAgICAgIHByaXZhdGUgJHE6IG5nLklRU2VydmljZSwgXG4gICAgICAgICAgICBwcml2YXRlICR0cmFuc2xhdGU6IG5nLnRyYW5zbGF0ZS5JVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgcHJvbW9TZXJ2aWNlOiBQcm9tb1NlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnByb21vU2VydmljZS5nZXRQcm9tb0ltYWdlcygpLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VzID0gZGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIE9uZVNpZ25hbC5zZW5kU2VsZk5vdGlmaWNhdGlvbihcbiAgLyogVGl0bGUgKGRlZmF1bHRzIGlmIHVuc2V0KSAqL1xuICBcIk9uZVNpZ25hbCBXZWIgUHVzaCBOb3RpZmljYXRpb25cIixcbiAgLyogTWVzc2FnZSAoZGVmYXVsdHMgaWYgdW5zZXQpICovXG4gIFwiQWN0aW9uIGJ1dHRvbnMgaW5jcmVhc2UgdGhlIHdheXMgeW91ciB1c2VycyBjYW4gaW50ZXJhY3Qgd2l0aCB5b3VyIG5vdGlmaWNhdGlvbi5cIiwgXG4gICAvKiBVUkwgKGRlZmF1bHRzIGlmIHVuc2V0KSAqL1xuICAnaHR0cHM6Ly9leGFtcGxlLmNvbS8/X29zcD1kb19ub3Rfb3BlbicsXG4gIC8qIEljb24gKi9cbiAgJ2h0dHBzOi8vb25lc2lnbmFsLmNvbS9pbWFnZXMvbm90aWZpY2F0aW9uX2xvZ28ucG5nJyxcbiAge1xuICAgIC8qIEFkZGl0aW9uYWwgZGF0YSBoYXNoICovXG4gICAgbm90aWZpY2F0aW9uVHlwZTogJ25ld3MtZmVhdHVyZSdcbiAgfSwgXG4gIFt7IC8qIEJ1dHRvbnMgKi9cbiAgICAvKiBDaG9vc2UgYW55IHVuaXF1ZSBpZGVudGlmaWVyIGZvciB5b3VyIGJ1dHRvbi4gVGhlIElEIG9mIHRoZSBjbGlja2VkIGJ1dHRvbiBpcyBwYXNzZWQgdG8geW91IHNvIHlvdSBjYW4gaWRlbnRpZnkgd2hpY2ggYnV0dG9uIGlzIGNsaWNrZWQgKi9cbiAgICBpZDogJ2xpa2UtYnV0dG9uJyxcbiAgICAvKiBUaGUgdGV4dCB0aGUgYnV0dG9uIHNob3VsZCBkaXNwbGF5LiBTdXBwb3J0cyBlbW9qaXMuICovXG4gICAgdGV4dDogJ0xpa2UnLFxuICAgIC8qIEEgdmFsaWQgcHVibGljbHkgcmVhY2hhYmxlIFVSTCB0byBhbiBpY29uLiBLZWVwIHRoaXMgc21hbGwgYmVjYXVzZSBpdCdzIGRvd25sb2FkZWQgb24gZWFjaCBub3RpZmljYXRpb24gZGlzcGxheS4gKi9cbiAgICBpY29uOiAnaHR0cDovL2kuaW1ndXIuY29tL044U044WlMucG5nJyxcbiAgICAvKiBUaGUgVVJMIHRvIG9wZW4gd2hlbiB0aGlzIGFjdGlvbiBidXR0b24gaXMgY2xpY2tlZC4gU2VlIHRoZSBzZWN0aW9ucyBiZWxvdyBmb3Igc3BlY2lhbCBVUkxzIHRoYXQgcHJldmVudCBvcGVuaW5nIGFueSB3aW5kb3cuICovXG4gICAgdXJsOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS8/X29zcD1kb19ub3Rfb3BlbidcbiAgfSxcbiAge1xuICAgIGlkOiAncmVhZC1tb3JlLWJ1dHRvbicsXG4gICAgdGV4dDogJ1JlYWQgbW9yZScsXG4gICAgaWNvbjogJ2h0dHA6Ly9pLmltZ3VyLmNvbS9NSXhKcDFMLnBuZycsXG4gICAgdXJsOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS8/X29zcD1kb19ub3Rfb3BlbidcbiAgfV1cbik7XG5cblxuXG4gICAgICAgIH0gXG5cbiAgICB9XG59XG5hcHAuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBbJyRzY29wZScsICckaHR0cCcsICckcScsICckdHJhbnNsYXRlJywgJ1Byb21vU2VydmljZScsIFRvbWVkZXNjb250b3MuTWFpbkNvbnRyb2xsZXJdKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
