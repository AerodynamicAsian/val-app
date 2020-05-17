import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class ApiService{
    constructor(private http: HttpClient/*, private auth: AuthService*/){}

    /*getUser(){
        return this.http.get(`${API_URL}/api/getuser`);
    }*/
}