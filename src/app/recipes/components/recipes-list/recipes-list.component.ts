import { Component, OnInit } from '@angular/core';
import { InfiniteScrollDirective } from '../../../shared/directives/infinite-scroll.directive';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../data/recipe.model';

@Component({
    selector: 'rrs-recipes-list',
    standalone: true,
    providers: [RecipeService],
    imports: [InfiniteScrollDirective],
    templateUrl: './recipes-list.component.html',
    styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent {
    constructor(protected router: Router,
                private recipeService: RecipeService) {
    }

    loading: boolean = false;
    recipesList: Recipe[] = [];

    loadRecipes(): void {
        this.loading = true;
        setTimeout(() => {
            this.recipesList.push(...this.recipeService.getLatestRecipes());
            this.loading = false;
        }, 500)
    }

    navigateToRecipeDetails(id: number) {
        this.router.navigate(['recipe/' + id]).then();
    }
}


