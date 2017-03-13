import { Routes } from '@angular/router';
import { Home } from './home';
import { Login } from './login';
import { Register } from './register';
import { Products } from './products';
import { Cart } from './cart';
import { AuthGuard } from './common/auth.guard';

export const routes: Routes = [
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: 'register', component: Register },
  { path: 'home',   component: Home, canActivate: [AuthGuard] },
  { path: 'products',   component: Products, canActivate: [AuthGuard] },
  { path: 'cart',   component: Cart, canActivate: [AuthGuard] },
  { path: '**',     component: Login },
];
