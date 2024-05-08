import { Component, OnInit } from '@angular/core';
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
export class RecipeDetailsComponent implements OnInit {
    recipe: Recipe = new Recipe();
    user: User = new User();
    recipeBookmarked: boolean;
    selectedItems: any[] = [];
    checkedArray:any[] = [];

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
            .subscribe((result: Recipe) => {
                this.recipe = result;
                this.recipeBookmarked = this.isRecipeBookmarked();
            });

        this.selectedItems = JSON.parse(localStorage.getItem('checkedIngredients' + this.recipe.id))
    }

    ngOnInit() {
        this.checkedArray = this.recipe.ingredients.map(ingredient => ({
            category: ingredient.category,
            items: ingredient.items.map(item => ({
                name: item.name,
                checked: this.checkIfIngredientChecked(ingredient.category, item.name)
            }))
        }));
    }

    toggleBookmarkRecipe() {
        const index = this.user.favoriteRecipes.indexOf(this.recipe.id);
        if (index !== -1) {
            this.user.favoriteRecipes = this.user.favoriteRecipes.filter(recipeId => recipeId !== this.recipe.id)
        } else {
            this.user.favoriteRecipes = [...this.user.favoriteRecipes, this.recipe.id];
        }

        this.recipeBookmarked = this.isRecipeBookmarked();
    }

    isRecipeBookmarked() {
       return this.user.favoriteRecipes.includes(this.recipe.id);
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView({behavior: 'smooth'});
    }

    onCheckIngredient(category: string, ingredient: string) {
        let ingredients: any[] = JSON.parse(localStorage.getItem('checkedIngredients' + this.recipe.id) || '[]');
        const categoryIndex: number = ingredients.findIndex((item) => item.category === category);

        if (categoryIndex === -1) {
            ingredients.push({
                recipeId: this.recipe.id,
                category: category,
                items: [{ name: ingredient }]
            });
        } else {
            const itemIndex: number = ingredients[categoryIndex].items.findIndex((item: { name: string }) => item.name === ingredient);

            if (itemIndex === -1) {
                ingredients[categoryIndex].items.push({ name: ingredient });
            } else {
                ingredients[categoryIndex].items.splice(itemIndex, 1);
            }

            if (ingredients[categoryIndex].items.length === 0) {
                ingredients.splice(categoryIndex, 1);
            }
        }
        localStorage.setItem('checkedIngredients' + this.recipe.id, JSON.stringify(ingredients));
    }

    checkIfIngredientChecked(category: string, ingredient: string) {
        if (!this.selectedItems) return false;
        const categoryItems = this.selectedItems.find(item => item.category === category)?.items;
        if (!categoryItems) return false;
        return categoryItems.some((item: { name: string }) => item.name === ingredient);
    }
}
