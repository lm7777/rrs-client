import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../data/recipe.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { finalize, Subscription } from 'rxjs';
import { IntersectionComponent } from '../../../shared/components/intersection/intersection.component';

@Component({
    selector: 'rrs-recipes-list',
    standalone: true,
    providers: [RecipeService],
    imports: [IntersectionComponent, LoadingComponent],
    templateUrl: './recipes-list.component.html',
    styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnDestroy {
    constructor(protected router: Router,
                private recipeService: RecipeService) {
    }

    private getLatestRecipesSubscription: Subscription;
    loading: boolean = false;
    recipesList: Recipe[] = [];


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
                .subscribe(result => {
                    this.recipesList.push(...result);
                });
        }, 500)
    }

    navigateToRecipeDetails(id: number) {
        this.router.navigate(['recipe/' + id]).then();
    }
}


