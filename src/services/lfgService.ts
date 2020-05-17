import { Observable } from 'rxjs';
import { environment } from 'src/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppComponent} from 'src/app/app.component'

const API_URL = environment.API_URL;
@Injectable({
    providedIn: 'root'
})

export class LFGService {

    constructor(private http: HttpClient) {}

    write(RiotID: string, PlayersNeeded: string, Language: string, NeedMic: string, enddate: string) {
        const options = { headers: new HttpHeaders({
                'Content-Type': 'application/json'
        })};
        // tslint:disable-next-line: max-line-length
        return this.http.post(`${API_URL}/api/notices`, { RiotID, PlayersNeeded, Language, NeedMic, enddate }, options);
    }

    read() {
        return this.http.get(`${API_URL}/api/notices`);
    }
}