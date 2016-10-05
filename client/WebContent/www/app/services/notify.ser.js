/// <reference path="../app.d.ts" />
var Tomedescontos;
(function (Tomedescontos) {
    var NotifyService = (function () {
        function NotifyService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        NotifyService.prototype.notifyNow = function (title, description, url) {
            OneSignal.sendSelfNotification(
            /* Title (defaults if unset) */
            title, 
            /* Message (defaults if unset) */
            description, 
            /* URL (defaults if unset) */
            url, 
            /* Icon */
            '../../assets/img/tdLogoBackground.png', {
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
        };
        return NotifyService;
    }());
    Tomedescontos.NotifyService = NotifyService;
})(Tomedescontos || (Tomedescontos = {}));
app.service("NotifyService", ['$http', '$q', Tomedescontos.NotifyService]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL25vdGlmeS5zZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBRXBDLElBQU8sYUFBYSxDQThDbkI7QUE5Q0QsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUVsQjtRQUVJLHVCQUFvQixLQUFzQixFQUM5QixFQUFnQjtZQURSLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQzlCLE9BQUUsR0FBRixFQUFFLENBQWM7UUFFNUIsQ0FBQztRQUVNLGlDQUFTLEdBQWhCLFVBQWlCLEtBQUssRUFBRSxXQUFXLEVBQUUsR0FBRztZQUVwQyxTQUFTLENBQUMsb0JBQW9CO1lBRTFCLCtCQUErQjtZQUMvQixLQUFLO1lBQ0wsaUNBQWlDO1lBQ2pDLFdBQVc7WUFDWCw2QkFBNkI7WUFDN0IsR0FBRztZQUNILFVBQVU7WUFDVix1Q0FBdUMsRUFDdkM7Z0JBQ0ksMEJBQTBCO2dCQUMxQixnQkFBZ0IsRUFBRSxjQUFjO2FBQ25DLEVBQ0QsQ0FBQztvQkFDRyw2SUFBNkk7b0JBQzdJLEVBQUUsRUFBRSxhQUFhO29CQUNqQiwwREFBMEQ7b0JBQzFELElBQUksRUFBRSxNQUFNO29CQUNaLHNIQUFzSDtvQkFDdEgsSUFBSSxFQUFFLGdDQUFnQztvQkFDdEMsa0lBQWtJO29CQUNsSSxHQUFHLEVBQUUsdUNBQXVDO2lCQUMvQztnQkFDRztvQkFDSSxFQUFFLEVBQUUsa0JBQWtCO29CQUN0QixJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLGdDQUFnQztvQkFDdEMsR0FBRyxFQUFFLHVDQUF1QztpQkFDL0MsQ0FBQyxDQUNULENBQUM7UUFHTixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQTNDQSxBQTJDQyxJQUFBO0lBM0NZLDJCQUFhLGdCQTJDekIsQ0FBQTtBQUNMLENBQUMsRUE5Q00sYUFBYSxLQUFiLGFBQWEsUUE4Q25CO0FBRUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InNlcnZpY2VzL25vdGlmeS5zZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYXBwLmQudHNcIiAvPlxuXG5tb2R1bGUgVG9tZWRlc2NvbnRvcyB7XG5cbiAgICBleHBvcnQgY2xhc3MgTm90aWZ5U2VydmljZSB7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBub3RpZnlOb3codGl0bGUsIGRlc2NyaXB0aW9uLCB1cmwpOiB2b2lkIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgT25lU2lnbmFsLnNlbmRTZWxmTm90aWZpY2F0aW9uKFxuXG4gICAgICAgICAgICAgICAgLyogVGl0bGUgKGRlZmF1bHRzIGlmIHVuc2V0KSAqL1xuICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgIC8qIE1lc3NhZ2UgKGRlZmF1bHRzIGlmIHVuc2V0KSAqL1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIC8qIFVSTCAoZGVmYXVsdHMgaWYgdW5zZXQpICovXG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIC8qIEljb24gKi9cbiAgICAgICAgICAgICAgICAnLi4vLi4vYXNzZXRzL2ltZy90ZExvZ29CYWNrZ3JvdW5kLnBuZycsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvKiBBZGRpdGlvbmFsIGRhdGEgaGFzaCAqL1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25UeXBlOiAnbmV3cy1mZWF0dXJlJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW3sgLyogQnV0dG9ucyAqL1xuICAgICAgICAgICAgICAgICAgICAvKiBDaG9vc2UgYW55IHVuaXF1ZSBpZGVudGlmaWVyIGZvciB5b3VyIGJ1dHRvbi4gVGhlIElEIG9mIHRoZSBjbGlja2VkIGJ1dHRvbiBpcyBwYXNzZWQgdG8geW91IHNvIHlvdSBjYW4gaWRlbnRpZnkgd2hpY2ggYnV0dG9uIGlzIGNsaWNrZWQgKi9cbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdsaWtlLWJ1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgIC8qIFRoZSB0ZXh0IHRoZSBidXR0b24gc2hvdWxkIGRpc3BsYXkuIFN1cHBvcnRzIGVtb2ppcy4gKi9cbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0xpa2UnLFxuICAgICAgICAgICAgICAgICAgICAvKiBBIHZhbGlkIHB1YmxpY2x5IHJlYWNoYWJsZSBVUkwgdG8gYW4gaWNvbi4gS2VlcCB0aGlzIHNtYWxsIGJlY2F1c2UgaXQncyBkb3dubG9hZGVkIG9uIGVhY2ggbm90aWZpY2F0aW9uIGRpc3BsYXkuICovXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdodHRwOi8vaS5pbWd1ci5jb20vTjhTTjhaUy5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAvKiBUaGUgVVJMIHRvIG9wZW4gd2hlbiB0aGlzIGFjdGlvbiBidXR0b24gaXMgY2xpY2tlZC4gU2VlIHRoZSBzZWN0aW9ucyBiZWxvdyBmb3Igc3BlY2lhbCBVUkxzIHRoYXQgcHJldmVudCBvcGVuaW5nIGFueSB3aW5kb3cuICovXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZXhhbXBsZS5jb20vP19vc3A9ZG9fbm90X29wZW4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdyZWFkLW1vcmUtYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdSZWFkIG1vcmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2h0dHA6Ly9pLmltZ3VyLmNvbS9NSXhKcDFMLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2V4YW1wbGUuY29tLz9fb3NwPWRvX25vdF9vcGVuJ1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgKTtcblxuXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmFwcC5zZXJ2aWNlKFwiTm90aWZ5U2VydmljZVwiLCBbJyRodHRwJywgJyRxJywgVG9tZWRlc2NvbnRvcy5Ob3RpZnlTZXJ2aWNlXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
