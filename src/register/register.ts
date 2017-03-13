import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';

const styles   = require('./register.css');
const template = require('./register.html');
const env = require('../../env.json');

@Component({
  selector: 'register',
  template: template,
  styles: [ styles ]
})
export class Register {
  constructor(public router: Router, public http: Http) {
  }

  register(event, name, password, email, gender) {
    event.preventDefault();
    let body = JSON.stringify({ name, password, email, gender});
    this.http.post(env.apiUrl + 'api/register', body, { headers: contentHeaders })
      .subscribe(
        response => {
          alert('Registered');
          this.router.navigate(['login']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

}
