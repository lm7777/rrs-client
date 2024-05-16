import { Injectable } from '@angular/core';
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {CheckedRecipeIngredients} from "../data/checkedRecipeIngredients.model";
import {IngredientCategory} from "../data/ingredientCategory";

@Injectable({
    providedIn: 'root'
})
export class IngredientsService {

    constructor(private localStorageService: LocalStorageService) {
    }


    getParsedUserSetting(key: string) {
        return JSON.parse(this.localStorageService.getUserSetting(key) || '[]');
    }


    storeNewRecipe(ingredients: CheckedRecipeIngredients[], recipeId: number, date: string, categoryName: string, ingredient: string) {
        ingredients.push({
            recipeId: recipeId,
            lastEditDate: date,
            categories: [{
                name: categoryName,
                items: [ingredient]
            }]
        });
    }

    storeNewCategory(ingredients: CheckedRecipeIngredients[], recipeIndex: number, category: string, ingredient: string) {
        ingredients[recipeIndex].categories.push({
            name: category,
            items: [ingredient]
        });
    }

    storeNewIngredient(selectedCategory: IngredientCategory, ingredient: string) {
        selectedCategory.items.push(ingredient)
    }
}
