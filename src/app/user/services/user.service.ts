import { Injectable } from '@angular/core';
import { User } from '../data/user.model';
import { Observable, of } from 'rxjs';
import { Recipe } from '../../recipes/data/recipe.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: User[] = [
        {
            id: 1,
            name: 'Joe Doe',
            favoriteRecipes: [1, 3],
            ratedRecipes: [
                {id: 1, rating: 3},
                {id: 3, rating: 5},
                {id: 5, rating: 4},
            ]
        }]

    constructor() {
    }

    getUserById(id: number): Observable<User> {
        return of(this.users.find((user: User) => user.id === id)!);
    }
}
