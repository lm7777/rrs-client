import { Component } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Recipe } from "../../data/recipe.model";
import { RecipeService } from "../../services/recipe.service";
import { switchMap } from 'rxjs';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { UserService } from '../../../user/services/user.service';
import { User } from '../../../user/data/user.model';
import { CheckboxComponent } from "../../../shared/components/checkbox/checkbox.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'rrs-recipe-details',
    standalone: true,
    imports: [
        StarRatingComponent,
        CheckboxComponent],
    providers: [],
    templateUrl: './recipe-details.component.html',
    styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent {
    recipe: Recipe = new Recipe();
    user: User = new User();

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private recipeService: RecipeService) {
        this.userService.getUserById(1)
            .pipe(takeUntilDestroyed())
            .subscribe((user: User) => this.user = user);

        this.route.params
            .pipe(switchMap((params: Params) => {
                return this.recipeService.getRecipe(+params['id']);
            }), takeUntilDestroyed())
            .subscribe((result: Recipe) => this.recipe = result);
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

    scroll(el: HTMLElement) {
        el.scrollIntoView({behavior: 'smooth'});
    }
}
