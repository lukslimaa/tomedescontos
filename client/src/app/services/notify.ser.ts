/// <reference path="../app.d.ts" />

module Tomedescontos {

    export class NotifyService {

        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService) {

        }

        public notifyNow(title, description, url): void {
            
            OneSignal.sendSelfNotification(

                /* Title (defaults if unset) */
                title,
                /* Message (defaults if unset) */
                description,
                /* URL (defaults if unset) */
                url,
                /* Icon */
                'http://tomedescontos.com/assets/img/tdLogoBackground.png',
                {
                    /* Additional data hash */
                    notificationType: 'news-feature'
                }
                // ,[{ /* Buttons */
                //     /* Choose any unique identifier for your button. The ID of the clicked button is passed to you so you can identify which button is clicked */
                //     id: 'like-button',
                //     /* The text the button should display. Supports emojis. */
                //     text: 'Like',
                //     /* A valid publicly reachable URL to an icon. Keep this small because it's downloaded on each notification display. */
                //     icon: 'http://i.imgur.com/N8SN8ZS.png',
                //     /* The URL to open when this action button is clicked. See the sections below for special URLs that prevent opening any window. */
                //     url: 'https://example.com/?_osp=do_not_open'
                // },
                // {
                //     id: 'read-more-button',
                //     text: 'Read more',
                //     icon: 'http://i.imgur.com/MIxJp1L.png',
                //     url: 'https://example.com/?_osp=do_not_open'
                // }]
            );
            
            this.playSoundNotification();

        }

        public playSoundNotification(): void {
            var sound = document.createElement("audio");
            sound.src = "../../assets/sounds/capisci.mp3";
            sound.setAttribute("preload","auto");
            sound.setAttribute("controls","none");
            sound.style.display = "none";
            document.body.appendChild(sound);

           sound.play();
        }

    }
}

app.service("NotifyService", ['$http', '$q', Tomedescontos.NotifyService]);