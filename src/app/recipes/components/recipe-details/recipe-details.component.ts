import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Recipe } from "../../data/recipe.model";
import { RecipeService } from "../../services/recipe.service";
import { Subscription } from 'rxjs';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';

@Component({
    selector: 'rrs-recipe-details',
    standalone: true,
    imports: [StarRatingComponent],
    providers: [RecipeService],
    templateUrl: './recipe-details.component.html',
    styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
    recipe: Recipe = new Recipe();

    private getRecipeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private recipeService: RecipeService) {
    }

    ngOnDestroy(): void {
        this.getRecipeSubscription?.unsubscribe();
    }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                    const recipeId: number = +params['id'];
                    this.getRecipeSubscription = this.recipeService.getRecipe(recipeId).subscribe((result: Recipe) => {
                        this.recipe = result;
                    });
                }
            );
    }
}
