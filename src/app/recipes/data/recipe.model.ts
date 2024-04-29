export class Recipe {
    id: number = 0;
    name: string = '';
    category: string = '';
    rating: number = 0;
    description: string = '';
    imageUrl: string = '';
    prepTime: string = '';
    cookTime: string = '';
    servings: string = '';
    ingredients: {
        category: string;
        items: {
            name: string;
            quantity: number;
            unitOfMeasurement: string;
        }[];
    }[] = [];
    nutritionFacts: {
        name: string;
        value: string;
    }[] = [];
    instructions: string[] = [];
}
