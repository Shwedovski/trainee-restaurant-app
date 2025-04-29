import { Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { PlesentvilleComponent } from './plesentville/plesentville.component';
import { MarioComponent } from './mario/mario.component';
import { TaykoComponent } from './tayko/tayko.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'favorite', component: FavoriteComponent },
    { path: 'plesentville', component: PlesentvilleComponent },
    { path: 'mario', component: MarioComponent },
    { path: 'tayko', component: TaykoComponent },
    { path: '**', component: HomeComponent }
];
