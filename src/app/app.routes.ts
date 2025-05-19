import { Routes } from '@angular/router';
import { BasketComponent } from './pages/basket/basket.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { PlesentvilleComponent } from './pages/plesentville/plesentville.component';
import { MarioComponent } from './pages/mario/mario.component';
import { TaykoComponent } from './pages/tayko/tayko.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'favorite', component: FavoriteComponent },
    { path: 'plesentville', component: PlesentvilleComponent },
    { path: 'mario', component: MarioComponent },
    { path: 'tayko', component: TaykoComponent },
    { path: 'login', component: LoginFormComponent},
    { path: '**', component: HomeComponent }
];
