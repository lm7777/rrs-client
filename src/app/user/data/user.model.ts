import { KeyValue } from '@angular/common';

export class User {
    id: number = 0;
    name: string = '';
    favoriteRecipes: number[] = [];
    ratedRecipes: { id: number, rating: number }[] = [];
}
