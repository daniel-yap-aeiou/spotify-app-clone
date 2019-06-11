import { Component, OnInit } from '@angular/core';



@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
    hash: any = {};

    constructor() {

    }

    ngOnInit() {
        console.log(location.hash);
        let that = this;
        let hash_temp = {};
        location.hash.replace(/^#\/?/, '').split('&').forEach(function (kv) {
            var spl = kv.indexOf('=');
            if (spl != -1) {
                hash_temp[kv.substring(0, spl)] = decodeURIComponent(kv.substring(spl + 1));
                that.hash = hash_temp;
            }
        });
        console.log('initial hash', this.hash);

        localStorage.setItem("spotify-accesstoken", this.hash.access_token);

        window.close();
        if (this.hash.access_token) {
            window.opener.postMessage(JSON.stringify({
                type: 'access_token',
                access_token: this.hash.access_token,
                expires_in: this.hash.expires_in || 0
            }), '*');
            window.close();
        }
    }
}
