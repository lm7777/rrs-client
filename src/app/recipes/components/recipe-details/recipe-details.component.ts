import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Recipe } from "../../data/recipe.model";
import { RecipeService } from "../../services/recipe.service";
import { Subscription } from 'rxjs';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { UserService } from '../../../user/services/user.service';
import { User } from '../../../user/data/user.model';

@Component({
    selector: 'rrs-recipe-details',
    standalone: true,
    imports: [StarRatingComponent],
    providers: [],
    templateUrl: './recipe-details.component.html',
    styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
    recipe: Recipe = new Recipe();
    user: User = new User();

    private getRecipeSubscription: Subscription;
    private getUserSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private recipeService: RecipeService) {
    }

    ngOnDestroy(): void {
        this.getUserSubscription?.unsubscribe();
        this.getRecipeSubscription?.unsubscribe();
    }

    ngOnInit() {
        this.getUserSubscription = this.userService.getUserById(1).subscribe((user: User) => {
                this.user = user;
            }
        );

        this.route.params.subscribe((params: Params) => {
                const recipeId: number = +params['id'];
                this.getRecipeSubscription = this.recipeService.getRecipe(recipeId).subscribe((result: Recipe) => {
                    this.recipe = result;
                });
            }
        );
    }

    toggleBookmarkRecipe() {
        const index = this.user.favoriteRecipes.indexOf(this.recipe.id);
        if (index !== -1) {
            this.user.favoriteRecipes = this.user.favoriteRecipes.filter(recipeId => recipeId !== this.recipe.id)
        } else {
            this.user.favoriteRecipes = [...this.user.favoriteRecipes, this.recipe.id];
        }
    }

    isRecipeBookmarked(): boolean {
        return this.user.favoriteRecipes.includes(this.recipe.id);
    }
}
