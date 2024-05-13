import { KeyValue } from '@angular/common';

export class User {
    id: number = 0;
    userName: string = '';
    favoriteRecipes: number[] = [];
    ratedRecipes: { id: number, rating: number }[] = [];
}
