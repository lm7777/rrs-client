import {Pipe, PipeTransform} from "@angular/core";
import {IngredientCategory} from "./ingredientCategory";

@Pipe({
    name: 'CheckSelectedIngredient',
    standalone: true,
    pure: false
})

export class CheckSelectedIngredient implements PipeTransform {
    transform(value: any , categoryName: string, ingredientName: string): any {
        if (value) {
            return value.categories
                .find((category: IngredientCategory) => category.name === categoryName)?.items.includes(ingredientName);
        }
        return false;
    }
}
