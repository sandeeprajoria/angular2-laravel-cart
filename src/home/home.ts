import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import LoadingSpinner from '../common/loadingSpinner';

const styles = require('./home.css');
const template = require('./home.html');
const env = require('../../env.json');

@Component({
  selector: 'home',
  template: template,
  styles: [ styles ]
})
export class Home extends LoadingSpinner {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  name: string;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    super();
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    this.getUserDetails();
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }

  getUserDetails() {
    this.showSpinner();
    this.authHttp.get(env.apiUrl + 'api/user')
      .subscribe(
      response => {
        this.hideSpinner();
        this.name = response.json().name;
      },
      error => {
        this.hideSpinner();
        alert((JSON.parse(error.text())).message);
        console.log(error.text());
      }
      );
  }

}
