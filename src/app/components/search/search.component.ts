import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../Artist';

import {
    HttpClient,
    HttpRequest,
    HttpHeaders,
    HttpParams
} from '@angular/common/http';
import { access } from 'fs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    searchStr: string;
    searchRes: Artist[];

    constructor(private _spotifyService: SpotifyService,
        private _http: HttpClient) {

    }

    ngOnInit() {

    }



    searchMusic() {
        if (this.searchStr === '' || this.searchStr === null || this.searchStr === undefined) {
            return false;
        }

        this._spotifyService.searchMusic(this.searchStr).subscribe(res => {
            this.searchRes = res.artists.items;
        });
    }

    doLogin() {
        this.getAuth();
    }

    login(callback) {

        var CLIENT_ID = 'bf511d7125384b7ea85a959e62dff61b';
        var REDIRECT_URI = 'http://localhost:4200/callback/';

        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
                '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
                '&scope=' + encodeURIComponent(scopes.join(' ')) +
                '&response_type=token';
        }

        var url = getLoginURL([
            'user-read-email',
            'user-read-private'
        ]);

        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        window.addEventListener("message", function (event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);

        var w = window.open(url, 'Spotify', 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
    }

    getAuth() {

        this.login(function (accessToken) {
            console.log(accessToken);
            localStorage.setItem("spotify-accesstoken", accessToken);
        });
    }
}
