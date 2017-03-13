import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';

const styles = require('./products.css');
const template = require('./products.html');
const env = require('../../env.json');

@Component({
  selector: 'products',
  template: template,
  styles: [ styles ]
})
export class Products {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  products: Array<Product> = new Array<Product>();

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    this.getProducts();
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }

  getProducts() {
    this.authHttp.get(env.apiUrl + 'api/product/all')
      .subscribe(
      response => {
        this.products = response.json().products;
        if (env.debug) console.log(this.products);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
  }

  addToCart(event, quantity, id) {
    event.preventDefault();
    let body = JSON.stringify({ 'product_id': id, 'quantity': quantity});
    this.authHttp.post(env.apiUrl + 'api/cart/add', body, { headers: contentHeaders })
      .subscribe(
        resp => console.log(resp),
        error => {
          console.log(error.text());
          alert((JSON.parse(error.text())).message);
        },
        () => alert('Successfully Added')
      );
  }

  showKeyValuePair( attributes: string ) {
    let json = JSON.parse(attributes);
    let str = '';
    console.log(Object.keys(json));
    Object.keys(json).forEach(element => {
      str += '<tr><td><strong>' + element + '</strong></td><td>' + json[element] + '</td></tr>';
    });
    return '<table class="table is-bordered is-narrow">' + str + '</table>';
  }

}

interface Product {
    id: number;
    product_name: string;
    price: number;
    product_category: string;
    product_sub_category: string;
    attributes: JSON;
}
