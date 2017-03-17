import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';

const styles = require('./login.css');
const template = require('./login.html');
const env = require('../../env.json');

@Component({
  selector: 'login',
  template: template,
  styles: [styles]
})
export class Login {
  constructor(public router: Router, public http: Http) {
  }

  login(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify(
      {
        'username': username,
        'password': password,
        'grant_type': 'password',
        'client_id': env.clientId,
        'client_secret': env.clientSecret,
        'scope': '*'
      });
    this.http.post(env.apiUrl + 'oauth/token', body, { headers: contentHeaders })
      .subscribe(
      response => {
        localStorage.setItem('id_token', response.json().access_token);
        this.router.navigate(['home']);
      },
      error => {
        alert((JSON.parse(error.text())).message);
        console.log(error.text());
      }
      );
  }

  register(event) {
    event.preventDefault();
    this.router.navigate(['register']);
  }
}
