import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';

const styles = require('./products.css');
const template = require('./products.html');

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
    this.http.get('http://landmark.localhost.com/api/product/all', { headers: contentHeaders })
      .subscribe(
      response => {
        this.products = response.json().products;
        console.log(this.products);
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
    this.http.post('http://landmark.localhost.com/api/cart/add', body, { headers: contentHeaders })
      .subscribe(
        response => {
          alert('Successfully Added');
          //this.router.navigate(['login']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

}

interface Product {
    id: number;
    product_name: string;
    price: number;
    product_category: string;
    product_sub_category: string;
    attributes: string;
}
