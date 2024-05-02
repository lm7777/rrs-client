import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../data/recipe.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { finalize, Subscription } from 'rxjs';
import { IntersectionComponent } from '../../../shared/components/intersection/intersection.component';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';

@Component({
    selector: 'rrs-recipes-list',
    standalone: true,
    providers: [],
    imports: [IntersectionComponent, LoadingComponent, StarRatingComponent],
    templateUrl: './recipes-list.component.html',
    styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnDestroy {
    loading: boolean = false;
    recipesList: Recipe[] = [];

    private getLatestRecipesSubscription: Subscription;

    constructor(protected router: Router,
                private recipeService: RecipeService) {
    }

    ngOnDestroy(): void {
        this.getLatestRecipesSubscription?.unsubscribe();
    }

    loadRecipes(): void {
        this.loading = true;
        setTimeout(() => {
            this.getLatestRecipesSubscription?.unsubscribe();
            this.getLatestRecipesSubscription = this.recipeService.getLatestRecipes()
                .pipe(finalize(() => {
                    this.loading = false;
                }))
                .subscribe((result: Recipe[]) => {
                    this.recipesList.push(...result);
                });
        }, 500)
    }

    navigateToRecipeDetails(id: number) {
        this.router.navigate(['recipe/' + id]).then();
    }
}


