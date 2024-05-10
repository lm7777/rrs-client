import { IngredientCategory } from "./ingredientCategory";

export class CheckedRecipeIngredients {
    recipeId: number = 0;
    lastEditDate?: string;
    categories: IngredientCategory[];
}
