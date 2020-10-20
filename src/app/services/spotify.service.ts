import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpRequest,
    HttpHeaders,
    HttpParams
} from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyService {
    private searchUrl: string;
    private artistUrl: string;
    private albumsUrl: string;
    private albumUrl: string;

    constructor(private _http: HttpClient) {

    }

    getToken() {
        let params = new HttpParams();
        params.append('grant_type', 'client_credentials');
        //let params = ('grant_type=client_credentials');
        let client_id = ''; // Your client id
        let client_secret = ''; // Your secret
        let encoded = btoa(client_id + ':' + client_secret);
        let headers = new HttpHeaders();
        headers.append('Authorization', 'Basic ' + encoded);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append('Content-Type', 'application/json');
        let proxy = 'https://cors-anywhere.herokuapp.com/';
        let uurl = 'https://accounts.spotify.com/api/token';

        let url = 'https://accounts.spotify.com/authorize?client_id=' + client_id
            + '&redirect_uri=' + encodeURIComponent('http://localhost:4200/')
            + '&scope=' + encodeURIComponent('playlist-read-private, user-read-private')
            + '&response_type=token';
        //params, { headers: headers })
        return this._http.get(proxy + url, {})
            .pipe(map((res: any) => {
                let data = res.json();
                return JSON.parse(data);
            }));
    }



    searchMusic(str: string, type = 'artist') {

        let accessToken = localStorage.getItem("spotify-accesstoken");

        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';

        let headers = new HttpHeaders();
        headers = headers.append("Authorization", 'Bearer ' + accessToken);
        headers = headers.append('Content-Type', 'application/json');

        return this._http.get(this.searchUrl, { headers: headers })
            .pipe(map((res: any) => res));
    }

    getArtist(id: string) {
        let accessToken = localStorage.getItem("spotify-accesstoken");

        let headers = new HttpHeaders();
        headers = headers.append("Authorization", 'Bearer ' + accessToken);
        headers = headers.append('Content-Type', 'application/json');

        this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
        return this._http.get(this.artistUrl, { headers: headers })
            .pipe(map((res: any) => res));
    }

    getAlbums(artistId: string) {
        let accessToken = localStorage.getItem("spotify-accesstoken");

        let headers = new HttpHeaders();
        headers = headers.append("Authorization", 'Bearer ' + accessToken);
        headers = headers.append('Content-Type', 'application/json');

        this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
        return this._http.get(this.albumsUrl, { headers: headers })
            .pipe(map((res: any) => res));
    }

    getAlbum(id: string) {
        let accessToken = localStorage.getItem("spotify-accesstoken");

        let headers = new HttpHeaders();
        headers = headers.append("Authorization", 'Bearer ' + accessToken);
        headers = headers.append('Content-Type', 'application/json');

        this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
        return this._http.get(this.albumUrl, { headers: headers })
            .pipe(map((res: any) => res));
    }
}
