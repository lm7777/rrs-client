import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    constructor(protected router: Router) {
    }

    navigateToHome() {
        this.router.navigate(['/']).then();
    }

    navigateToRecipeDetails(recipeId: number) {
        this.router.navigate(['recipe/' + recipeId]).then();
    }
}
