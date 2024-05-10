import {CategoryModel} from "./category.model";

export class CheckedItems {
    recipeId: number = 0;
    lastEditDate?: string;
    categories: CategoryModel[];
}
