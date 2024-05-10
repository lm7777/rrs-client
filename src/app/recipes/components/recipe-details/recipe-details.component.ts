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
import { CheckedItems } from "../../data/checkedItems.model";
import { CategoryModel } from "../../data/category.model";

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
    selectedItems: CheckedItems[] = [];
    checkedArray: CategoryModel[] = [];
    userCheckedIngredientsKey: string;
    showClearAll: boolean = false;
    private isLocalStorageAvailable = typeof localStorage !== 'undefined';

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

        this.userCheckedIngredientsKey = 'checkedIngredients:' + this.user.name;

        if (this.isLocalStorageAvailable) {
            this.selectedItems = JSON.parse(localStorage.getItem(this.userCheckedIngredientsKey));
        }
    }

    ngOnInit() {
        this.checkedArray = this.recipe.ingredients.map(ingredient => ({
            name: ingredient.category,
            items: ingredient.items.map(item => ({
                name: item.name,
                checked: this.checkIfIngredientChecked(ingredient.category, item.name)
            }))
        }));

        this.showClearAll = this.isAtLeastOneIngredientChecked();
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
        let ingredients: CheckedItems[] = [];
        if (this.isLocalStorageAvailable) {
            ingredients = JSON.parse(localStorage.getItem(this.userCheckedIngredientsKey) || '[]');
        }

        let recipeIndex = ingredients.findIndex(item => item.recipeId === this.recipe.id);

        if (ingredients.length === 10 && recipeIndex === -1) {
            ingredients.splice(this.getOldestEditedRecipeIndex(ingredients), 1);
        }

        if (recipeIndex === -1 && ingredients.length < 10) {
            ingredients.push({
                recipeId: this.recipe.id,
                lastEditDate: new Date().toString(),
                categories: [{
                    name: category,
                    items: [{ name: ingredient }]
                }]
            });

            this.updateItemInCheckedArray(category, ingredient, true);
            this.showClearAll = true;
        } else {
            const categoryIndex = ingredients[recipeIndex].categories
                                            .findIndex(cat => cat.name === category);

            if (categoryIndex === -1) {
                ingredients[recipeIndex].categories.push({
                    name: category,
                    items: [{ name: ingredient }]
                });

                this.updateItemInCheckedArray(category, ingredient, true);
                this.showClearAll = true;
            } else {
                const itemIndex = ingredients[recipeIndex].categories[categoryIndex].items
                                                                .findIndex(item => item.name === ingredient);

                if (itemIndex === -1) {
                    ingredients[recipeIndex].categories[categoryIndex].items.push({ name: ingredient });

                    this.updateItemInCheckedArray(category, ingredient, true);
                    this.showClearAll = true;

                } else {
                    ingredients[recipeIndex].categories[categoryIndex].items.splice(itemIndex, 1);

                    this.updateItemInCheckedArray(category, ingredient, false);
                }

                if (ingredients[recipeIndex].categories[categoryIndex].items.length === 0) {
                    ingredients[recipeIndex].categories.splice(categoryIndex, 1);
                }
            }

            ingredients[recipeIndex].lastEditDate = new Date().toString();
            if (ingredients[recipeIndex].categories.length === 0) {
                ingredients.splice(recipeIndex, 1);
            }
        }

        this.showClearAll = this.isAtLeastOneIngredientChecked();

        if (this.isLocalStorageAvailable) {
            if (ingredients.length > 0) {
                localStorage.setItem(this.userCheckedIngredientsKey, JSON.stringify(ingredients));
            } else {
                localStorage.removeItem(this.userCheckedIngredientsKey);
            }
        }
    }

    getOldestEditedRecipeIndex(ingredients: CheckedItems[]) {
        let oldestItem = ingredients[0];

        for (let i = 1; i < ingredients.length; i++) {
            const currentItem = ingredients[i];

            if (currentItem.lastEditDate < oldestItem.lastEditDate) {
                oldestItem = currentItem;
            }
        }
        return ingredients.indexOf(oldestItem);
    }

    checkIfIngredientChecked(category: string, ingredient: string) {
        if (!this.selectedItems) return false;
        const categoryItems = this.selectedItems
            .find(item => item.recipeId === this.recipe.id)?.categories
            .find(cat => cat.name === category)?.items;
        if (!categoryItems) return false;
        return categoryItems.some((item: { name: string }) => item.name === ingredient);
    }

    onClearAllCheckedIngredients() {
        this.showClearAll = false;

        this.checkedArray.forEach(ingredient => {
            ingredient.items.forEach(item => {
                this.updateItemInCheckedArray(ingredient.name, item.name, false);
            });
        });

        if (this.isLocalStorageAvailable) {
            const ingredients: CheckedItems[] = JSON.parse(localStorage.getItem(this.userCheckedIngredientsKey));
            const RecipeIndex = ingredients.findIndex(item => item.recipeId === this.recipe.id);
            ingredients.splice(RecipeIndex, 1);
            localStorage.setItem(this.userCheckedIngredientsKey, JSON.stringify(ingredients));
        }
    }

    updateItemInCheckedArray(category: string, ingredient: string, isChecked: boolean) {
        this.checkedArray.find(cat => cat.name === category).items
            .find(item => item.name === ingredient).checked = isChecked;
    }

    isAtLeastOneIngredientChecked() {
        return this.checkedArray.some(category =>
            category.items.some(item => item.checked)
        );
    }
}
