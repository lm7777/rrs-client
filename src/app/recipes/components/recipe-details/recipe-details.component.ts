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
import { CheckedRecipeIngredients } from "../../data/checkedRecipeIngredients.model";
import { IngredientCategory } from "../../data/ingredientCategory";
import { LocalStorageService } from '../../../shared/services/local-storage.service';

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
    selectedItems: CheckedRecipeIngredients[] = [];
    storageRecipeIndex: number;
    userCheckedIngredientsKey: string = 'checkedIngredients';
    showClearAll: boolean = false;
    maxStoredRecipes: number = 10;
    private isLocalStorageAvailable: boolean = typeof localStorage !== 'undefined';

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private recipeService: RecipeService,
                private localStorageService: LocalStorageService) {

        this.userService.getUserInfo()
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

        this.getFromStorage();
    }

    ngOnInit() {
        this.updateShowClearAllStatus();
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
        let ingredients: CheckedRecipeIngredients[] = [];
        if (this.isLocalStorageAvailable) {

            ingredients = JSON.parse(this.localStorageService.getUserSetting(this.userCheckedIngredientsKey) || '[]');
        }

        let recipeIndex: number = ingredients.findIndex(item => item.recipeId === this.recipe.id);
        const categories: IngredientCategory[] = ingredients[recipeIndex]?.categories;

        if (ingredients.length === this.maxStoredRecipes && recipeIndex === -1) {
            ingredients.splice(this.getOldestEditedRecipeIndex(ingredients), 1);
        }

        if (recipeIndex === -1 && ingredients.length < this.maxStoredRecipes) {
            ingredients.push({
                recipeId: this.recipe.id,
                lastEditDate: new Date().toString(),
                categories: [{
                    name: category,
                    items: [ingredient]
                }]
            });
        } else {
            const categoryIndex: number = categories.findIndex(cat => cat.name === category);
            const selectedCategory: IngredientCategory = categories[categoryIndex];

            if (categoryIndex === -1) {
                ingredients[recipeIndex].categories.push({
                    name: category,
                    items: [ingredient]
                });
            } else {
                const itemIndex: number = selectedCategory.items.findIndex(item => item === ingredient);

                itemIndex === -1 ? selectedCategory.items.push(ingredient) : selectedCategory.items.splice(itemIndex, 1);

                if (selectedCategory.items.length === 0) {
                    categories.splice(categoryIndex, 1);
                }
            }

            ingredients[recipeIndex].lastEditDate = new Date().toString();
            if (categories.length === 0) {
                ingredients.splice(recipeIndex, 1);
            }
        }

        if (this.isLocalStorageAvailable) {
            if (ingredients.length > 0) {
                this.localStorageService.setUserSetting(this.userCheckedIngredientsKey, JSON.stringify(ingredients));
            } else {
                this.localStorageService.removeUserSetting(this.userCheckedIngredientsKey);
            }
        }
        this.getFromStorage();
        this.updateShowClearAllStatus();
    }

    getFromStorage() {
        if (this.isLocalStorageAvailable) {
            this.selectedItems = JSON.parse(this.localStorageService.getUserSetting(this.userCheckedIngredientsKey));
            this.storageRecipeIndex = -1;
            if (this.selectedItems) {
                this.storageRecipeIndex = this.selectedItems?.findIndex((r: CheckedRecipeIngredients)=> r.recipeId === this.recipe.id);
            }
        }
    }

    getOldestEditedRecipeIndex(ingredients: CheckedRecipeIngredients[]) {
        let oldestItem = ingredients[0];

        for (let i = 1; i < ingredients.length; i++) {
            const currentItem = ingredients[i];

            if (currentItem.lastEditDate < oldestItem.lastEditDate) {
                oldestItem = currentItem;
            }
        }
        return ingredients.indexOf(oldestItem);
    }

    onClearAllCheckedIngredients() {
        this.showClearAll = false;
        this.getFromStorage();
        this.storageRecipeIndex = -1;

        if (this.isLocalStorageAvailable) {
            const RecipeIndex = this.selectedItems.findIndex(item => item.recipeId === this.recipe.id);
            this.selectedItems.splice(RecipeIndex, 1);
            this.selectedItems.length === 0 ? this.localStorageService.removeUserSetting(this.userCheckedIngredientsKey) :
                this.localStorageService.setUserSetting(this.userCheckedIngredientsKey, JSON.stringify(this.selectedItems));
        }
    }

    updateShowClearAllStatus() {
        this.showClearAll = this.storageRecipeIndex > -1 && this.selectedItems[this.storageRecipeIndex].categories.length > 0;
    }
}
