import { Injectable } from '@angular/core';
import { User } from '../data/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: User[] = [
        {
            id: 1,
            userName: 'Joe Doe',
            favoriteRecipes: [1, 3],
            ratedRecipes: [
                {id: 1, rating: 3},
                {id: 3, rating: 5},
                {id: 5, rating: 4},
            ]
        }]

    constructor() {
    }

    getUserInfo(): Observable<User> {
        return of(this.users[0]);
    }
}
