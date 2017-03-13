import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';

const styles = require('./home.css');
const template = require('./home.html');
const env = require('../../env.json');

@Component({
  selector: 'home',
  template: template,
  styles: [ styles ]
})
export class Home {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  name: string;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    this.getUserDetails();
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }

  getUserDetails() {
    this.http.get(env.apiUrl + 'api/user', { headers: contentHeaders })
      .subscribe(
      response => {
        this.name = response.json().name;
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
  }

}
