import { Injectable } from "@angular/core";
import { Recipe } from "../data/recipe.model";
import { Observable, of } from 'rxjs';

@Injectable()
export class RecipeService {

    recipes: Recipe[] = [
        {
            id:  1,
            name: 'Chocolate Chip Cookies',
            category: 'Dessert',
            rating: 4.8,
            description: 'Classic homemade chocolate chip cookies.',
            imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/delish-200603-toll-house-chocolate-chip-cookies-0003-landscape-ag-1591384336.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
            prepTime: '15 MIN',
            cookTime: '10 MIN',
            servings: '24 cookies',
            ingredients: [
                {
                    category: 'Dry Ingredients',
                    items: [
                        { name: 'All-purpose flour', quantity: 200, unitOfMeasurement: 'g' },
                        { name: 'Baking soda', quantity: 1, unitOfMeasurement: 'teaspoon' },
                        { name: 'Salt', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Wet Ingredients',
                    items: [
                        { name: 'Unsalted butter', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Granulated sugar', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Brown sugar', quantity: 50, unitOfMeasurement: 'g' },
                        { name: 'Egg', quantity: 1, unitOfMeasurement: '' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Add-ins',
                    items: [
                        { name: 'Chocolate chips', quantity: 1, unitOfMeasurement: 'tablespoon' },
                        { name: 'Chopped nuts (optional)', quantity: 1, unitOfMeasurement: 'teaspoon' },
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '150' },
                { name: 'Protein', value: '2g' },
                { name: 'Fat', value: '8g' },
                { name: 'Carbohydrates', value: '18g' }
            ],
            instructions: [
                'Preheat oven to 350°F (175°C) and line baking sheets with parchment paper.',
                'In a medium bowl, whisk together the dry ingredients: flour, baking soda, and salt.',
                'In a large mixing bowl, cream together the butter, granulated sugar, and brown sugar until light and fluffy.',
                'Beat in the egg and vanilla extract until well combined.',
                'Gradually add the dry ingredients to the wet ingredients, mixing until just combined.',
                'Stir in the chocolate chips and nuts, if using.',
                'Drop rounded tablespoons of dough onto the prepared baking sheets, spacing them 2 inches apart.',
                'Bake in the preheated oven for 8-10 minutes, or until the edges are golden brown.',
                'Allow cookies to cool on the baking sheets for a few minutes before transferring them to wire racks to cool completely.'
            ]
        },
        {
            id: 2,
            name: 'Vanilla Cupcakes',
            category: 'Dessert',
            rating: 4.7,
            description: 'Delicious homemade vanilla cupcakes with creamy frosting.',
            imageUrl: 'https://media.eggs.ca/assets/RecipeThumbs/EFC-Classic-Vanilla-Cupcakes-1280x720.jpg',
            prepTime: '20 MIN',
            cookTime: '20 MIN',
            servings: '12 cupcakes',
            ingredients: [
                {
                    category: 'Dry Ingredients',
                    items: [
                        { name: 'All-purpose flour', quantity: 250, unitOfMeasurement: 'g' },
                        { name: 'Baking powder', quantity: 1, unitOfMeasurement: 'teaspoon' },
                        { name: 'Salt', quantity: 1, unitOfMeasurement: 'teaspoon' },
                    ]
                },
                {
                    category: 'Wet Ingredients',
                    items: [
                        { name: 'Unsalted butter', quantity: 250, unitOfMeasurement: 'g' },
                        { name: 'Granulated sugar', quantity: 150, unitOfMeasurement: 'g' },
                        { name: 'Egg', quantity: 2, unitOfMeasurement: '' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: '' },
                        { name: 'Whole milk', quantity: 150, unitOfMeasurement: 'ml' },
                    ]
                },
                {
                    category: 'Frosting',
                    items: [
                        { name: 'Unsalted butter', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Powdered sugar', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' },
                        { name: 'Milk', quantity: 50, unitOfMeasurement: 'ml' }
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '250' },
                { name: 'Protein', value: '3g' },
                { name: 'Fat', value: '12g' },
                { name: 'Carbohydrates', value: '32g' }
            ],
            instructions: [
                'Preheat oven to 350°F (175°C) and line muffin pans with cupcake liners.',
                'In a medium bowl, whisk together the dry ingredients: flour, baking powder, and salt.',
                'In a large mixing bowl, cream together the butter and granulated sugar until light and fluffy.',
                'Beat in the egg and vanilla extract until well combined.',
                'Gradually add the dry ingredients to the wet ingredients, alternating with the milk, mixing until just combined.',
                'Scoop the batter into the prepared muffin pans, filling each liner about two-thirds full.',
                'Bake in the preheated oven for 18-20 minutes, or until a toothpick inserted into the center comes out clean.',
                'Allow cupcakes to cool in the pans for 5 minutes before transferring them to wire racks to cool completely.',
                'Meanwhile, prepare the frosting by creaming together the butter, powdered sugar, and vanilla extract.',
                'Add milk as needed to achieve desired consistency.',
                'Once cupcakes are completely cooled, frost them with the prepared frosting.'
            ]
        },
        {
            id: 3,
            name: 'Red Velvet Cake',
            category: 'Dessert',
            rating: 3.5,
            description: 'Decadent red velvet cake with cream cheese frosting, perfect for special occasions.',
            imageUrl: 'https://bakingamoment.com/wp-content/uploads/2018/05/IMG_7745-red-velvet-layer-cake-horizontal.jpg',
            prepTime: '25 MIN',
            cookTime: '30 MIN',
            servings: '12 servings',
            ingredients: [
                {
                    category: 'Cake',
                    items: [
                        { name: 'All-purpose flour', quantity: 150, unitOfMeasurement: 'g' },
                        { name: 'Cocoa powder', quantity: 50, unitOfMeasurement: 'g' },
                        { name: 'Baking soda', quantity: 1, unitOfMeasurement: 'teaspoon' },
                        { name: 'Salt', quantity: 1, unitOfMeasurement: 'teaspoon' },
                        { name: 'Unsalted butter', quantity: 50, unitOfMeasurement: 'g' },
                        { name: 'Granulated sugar', quantity: 50, unitOfMeasurement: 'g' },
                        { name: 'Eggs', quantity: 1, unitOfMeasurement: '' },
                        { name: 'Buttermilk', quantity: 25, unitOfMeasurement: 'ml' },
                        { name: 'Red food coloring', quantity: 1, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' },
                        { name: 'White vinegar', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Frosting',
                    items: [
                        { name: 'Cream cheese', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Unsalted butter', quantity: 50, unitOfMeasurement: 'g' },
                        { name: 'Powdered sugar', quantity: 50, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' },
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '400' },
                { name: 'Protein', value: '5g' },
                { name: 'Fat', value: '20g' },
                { name: 'Carbohydrates', value: '50g' }
            ],
            instructions: [
                'Preheat oven to 350°F (175°C) and grease and flour two 9-inch round cake pans.',
                'In a medium bowl, sift together flour, cocoa powder, baking soda, and salt.',
                'In a large mixing bowl, cream together butter and granulated sugar until light and fluffy. Beat in eggs one at a time.',
                'Mix in buttermilk, red food coloring, and vanilla extract until well combined.',
                'Gradually add dry ingredients to wet ingredients, mixing until smooth. Stir in white vinegar.',
                'Divide batter evenly between prepared cake pans and smooth the tops with a spatula.',
                'Bake in preheated oven for 25-30 minutes, or until a toothpick inserted into the center comes out clean.',
                'Remove cakes from oven and cool in pans for 10 minutes before transferring to wire racks to cool completely.',
                'Meanwhile, prepare the cream cheese frosting by beating together cream cheese, butter, powdered sugar, and vanilla extract until smooth and creamy.',
                'Once cakes are completely cooled, frost the top of one cake layer with cream cheese frosting. Place the second cake layer on top and frost the top and sides of the cake with remaining frosting.',
                'Slice and serve the red velvet cake, and enjoy!'
            ]
        },
        {
            id: 4,
            name: 'Chocolate Truffles',
            category: 'Dessert',
            rating: 2.7,
            description: 'Indulgent homemade chocolate truffles coated in cocoa powder, nuts, or shredded coconut.',
            imageUrl: 'https://mojo.generalmills.com/api/public/content/4KZY5_sGckWlIsX2tVjWKg_gmi_hi_res_jpeg.jpeg?v=37036a84&t=466b54bb264e48b199fc8e83ef1136b4',
            prepTime: '20 MIN',
            cookTime: '0 MIN',
            servings: '24 truffles',
            ingredients: [
                {
                    category: 'Truffles',
                    items: [
                        { name: 'Dark chocolate', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Heavy cream', quantity: 60, unitOfMeasurement: 'ml' },
                        { name: 'Butter', quantity: 40, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Coatings',
                    items: [
                        { name: 'Cocoa powder', quantity: 15, unitOfMeasurement: 'g' },
                        { name: 'Chopped nuts', quantity: 20, unitOfMeasurement: 'g' },
                        { name: 'Shredded coconut', quantity: 20, unitOfMeasurement: 'g' }
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '120' },
                { name: 'Protein', value: '1g' },
                { name: 'Fat', value: '9g' },
                { name: 'Carbohydrates', value: '9g' }
            ],
            instructions: [
                'Chop the dark chocolate into small pieces and place in a heatproof bowl.',
                'In a small saucepan, heat the heavy cream and butter over medium heat until it just begins to simmer. Pour the hot cream mixture over the chopped chocolate and let it sit for 1-2 minutes.',
                'Stir the chocolate and cream together until smooth and glossy. Mix in vanilla extract.',
                'Cover the bowl with plastic wrap and refrigerate for at least 2 hours, or until the mixture is firm enough to scoop.',
                'Using a spoon or a small scoop, portion out the chocolate mixture and roll it into balls. Place the truffles on a baking sheet lined with parchment paper.',
                'Once all the truffles are rolled, place the baking sheet in the refrigerator for another 15-20 minutes to firm up the truffles.',
                'Roll the chilled truffles in cocoa powder, chopped nuts, or shredded coconut to coat them completely.',
                'Store the chocolate truffles in an airtight container in the refrigerator until ready to serve. Enjoy!',
            ]
        },
        {
            id: 5,
            name: 'Long recipe name made with low rating for testing long name and low rating',
            category: 'Dessert',
            rating: 0.6,
            description: 'Indulgent homemade chocolate truffles coated in cocoa powder, nuts, or shredded coconut.',
            imageUrl: 'https://fabrx.co/preview/tastebite/assets/images/menus/menu7.jpg',
            prepTime: '20 MIN',
            cookTime: '0 MIN',
            servings: '24 truffles',
            ingredients: [
                {
                    category: 'Truffles',
                    items: [
                        { name: 'Dark chocolate', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Heavy cream', quantity: 60, unitOfMeasurement: 'ml' },
                        { name: 'Butter', quantity: 40, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Coatings',
                    items: [
                        { name: 'Cocoa powder', quantity: 15, unitOfMeasurement: 'g' },
                        { name: 'Chopped nuts', quantity: 20, unitOfMeasurement: 'g' },
                        { name: 'Shredded coconut', quantity: 20, unitOfMeasurement: 'g' }
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '120' },
                { name: 'Protein', value: '1g' },
                { name: 'Fat', value: '9g' },
                { name: 'Carbohydrates', value: '9g' }
            ],
            instructions: [
                'Chop the dark chocolate into small pieces and place in a heatproof bowl.',
                'In a small saucepan, heat the heavy cream and butter over medium heat until it just begins to simmer. Pour the hot cream mixture over the chopped chocolate and let it sit for 1-2 minutes.',
                'Stir the chocolate and cream together until smooth and glossy. Mix in vanilla extract.',
                'Cover the bowl with plastic wrap and refrigerate for at least 2 hours, or until the mixture is firm enough to scoop.',
                'Using a spoon or a small scoop, portion out the chocolate mixture and roll it into balls. Place the truffles on a baking sheet lined with parchment paper.',
                'Once all the truffles are rolled, place the baking sheet in the refrigerator for another 15-20 minutes to firm up the truffles.',
                'Roll the chilled truffles in cocoa powder, chopped nuts, or shredded coconut to coat them completely.',
                'Store the chocolate truffles in an airtight container in the refrigerator until ready to serve. Enjoy!',
            ]
        },
        {
            id: 6,
            name: 'Recipe 6',
            category: 'Dessert',
            rating: 2,
            description: 'Indulgent homemade chocolate truffles coated in cocoa powder, nuts, or shredded coconut.',
            imageUrl: 'https://fabrx.co/preview/tastebite/assets/images/menus/menu16.jpg',
            prepTime: '20 MIN',
            cookTime: '0 MIN',
            servings: '24 truffles',
            ingredients: [
                {
                    category: 'Truffles',
                    items: [
                        { name: 'Dark chocolate', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Heavy cream', quantity: 60, unitOfMeasurement: 'ml' },
                        { name: 'Butter', quantity: 40, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Coatings',
                    items: [
                        { name: 'Cocoa powder', quantity: 15, unitOfMeasurement: 'g' },
                        { name: 'Chopped nuts', quantity: 20, unitOfMeasurement: 'g' },
                        { name: 'Shredded coconut', quantity: 20, unitOfMeasurement: 'g' }
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '120' },
                { name: 'Protein', value: '1g' },
                { name: 'Fat', value: '9g' },
                { name: 'Carbohydrates', value: '9g' }
            ],
            instructions: [
                'Chop the dark chocolate into small pieces and place in a heatproof bowl.',
                'In a small saucepan, heat the heavy cream and butter over medium heat until it just begins to simmer. Pour the hot cream mixture over the chopped chocolate and let it sit for 1-2 minutes.',
                'Stir the chocolate and cream together until smooth and glossy. Mix in vanilla extract.',
                'Cover the bowl with plastic wrap and refrigerate for at least 2 hours, or until the mixture is firm enough to scoop.',
                'Using a spoon or a small scoop, portion out the chocolate mixture and roll it into balls. Place the truffles on a baking sheet lined with parchment paper.',
                'Once all the truffles are rolled, place the baking sheet in the refrigerator for another 15-20 minutes to firm up the truffles.',
                'Roll the chilled truffles in cocoa powder, chopped nuts, or shredded coconut to coat them completely.',
                'Store the chocolate truffles in an airtight container in the refrigerator until ready to serve. Enjoy!',
            ]
        },
        {
            id: 7,
            name: 'Recipe 7',
            category: 'Dessert',
            rating: 3,
            description: 'Indulgent homemade chocolate truffles coated in cocoa powder, nuts, or shredded coconut.',
            imageUrl: 'https://fabrx.co/preview/tastebite/assets/images/menus/menu18.jpg',
            prepTime: '20 MIN',
            cookTime: '0 MIN',
            servings: '24 truffles',
            ingredients: [
                {
                    category: 'Truffles',
                    items: [
                        { name: 'Dark chocolate', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Heavy cream', quantity: 60, unitOfMeasurement: 'ml' },
                        { name: 'Butter', quantity: 40, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Coatings',
                    items: [
                        { name: 'Cocoa powder', quantity: 15, unitOfMeasurement: 'g' },
                        { name: 'Chopped nuts', quantity: 20, unitOfMeasurement: 'g' },
                        { name: 'Shredded coconut', quantity: 20, unitOfMeasurement: 'g' }
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '120' },
                { name: 'Protein', value: '1g' },
                { name: 'Fat', value: '9g' },
                { name: 'Carbohydrates', value: '9g' }
            ],
            instructions: [
                'Chop the dark chocolate into small pieces and place in a heatproof bowl.',
                'In a small saucepan, heat the heavy cream and butter over medium heat until it just begins to simmer. Pour the hot cream mixture over the chopped chocolate and let it sit for 1-2 minutes.',
                'Stir the chocolate and cream together until smooth and glossy. Mix in vanilla extract.',
                'Cover the bowl with plastic wrap and refrigerate for at least 2 hours, or until the mixture is firm enough to scoop.',
                'Using a spoon or a small scoop, portion out the chocolate mixture and roll it into balls. Place the truffles on a baking sheet lined with parchment paper.',
                'Once all the truffles are rolled, place the baking sheet in the refrigerator for another 15-20 minutes to firm up the truffles.',
                'Roll the chilled truffles in cocoa powder, chopped nuts, or shredded coconut to coat them completely.',
                'Store the chocolate truffles in an airtight container in the refrigerator until ready to serve. Enjoy!',
            ]
        },
        {
            id: 8,
            name: 'Recipe 8',
            category: 'Dessert',
            rating: 4,
            description: 'Indulgent homemade chocolate truffles coated in cocoa powder, nuts, or shredded coconut.',
            imageUrl: 'https://fabrx.co/preview/tastebite/assets/images/menus/menu41.jpg',
            prepTime: '20 MIN',
            cookTime: '0 MIN',
            servings: '24 truffles',
            ingredients: [
                {
                    category: 'Truffles',
                    items: [
                        { name: 'Dark chocolate', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Heavy cream', quantity: 60, unitOfMeasurement: 'ml' },
                        { name: 'Butter', quantity: 40, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Coatings',
                    items: [
                        { name: 'Cocoa powder', quantity: 15, unitOfMeasurement: 'g' },
                        { name: 'Chopped nuts', quantity: 20, unitOfMeasurement: 'g' },
                        { name: 'Shredded coconut', quantity: 20, unitOfMeasurement: 'g' }
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '120' },
                { name: 'Protein', value: '1g' },
                { name: 'Fat', value: '9g' },
                { name: 'Carbohydrates', value: '9g' }
            ],
            instructions: [
                'Chop the dark chocolate into small pieces and place in a heatproof bowl.',
                'In a small saucepan, heat the heavy cream and butter over medium heat until it just begins to simmer. Pour the hot cream mixture over the chopped chocolate and let it sit for 1-2 minutes.',
                'Stir the chocolate and cream together until smooth and glossy. Mix in vanilla extract.',
                'Cover the bowl with plastic wrap and refrigerate for at least 2 hours, or until the mixture is firm enough to scoop.',
                'Using a spoon or a small scoop, portion out the chocolate mixture and roll it into balls. Place the truffles on a baking sheet lined with parchment paper.',
                'Once all the truffles are rolled, place the baking sheet in the refrigerator for another 15-20 minutes to firm up the truffles.',
                'Roll the chilled truffles in cocoa powder, chopped nuts, or shredded coconut to coat them completely.',
                'Store the chocolate truffles in an airtight container in the refrigerator until ready to serve. Enjoy!',
            ]
        },
        {
            id: 9,
            name: 'Recipe 9',
            category: 'Dessert',
            rating: 5,
            description: 'Indulgent homemade chocolate truffles coated in cocoa powder, nuts, or shredded coconut.',
            imageUrl: 'https://fabrx.co/preview/tastebite/assets/images/menus/menu42.jpg',
            prepTime: '20 MIN',
            cookTime: '0 MIN',
            servings: '24 truffles',
            ingredients: [
                {
                    category: 'Truffles',
                    items: [
                        { name: 'Dark chocolate', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Heavy cream', quantity: 60, unitOfMeasurement: 'ml' },
                        { name: 'Butter', quantity: 40, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Coatings',
                    items: [
                        { name: 'Cocoa powder', quantity: 15, unitOfMeasurement: 'g' },
                        { name: 'Chopped nuts', quantity: 20, unitOfMeasurement: 'g' },
                        { name: 'Shredded coconut', quantity: 20, unitOfMeasurement: 'g' }
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '120' },
                { name: 'Protein', value: '1g' },
                { name: 'Fat', value: '9g' },
                { name: 'Carbohydrates', value: '9g' }
            ],
            instructions: [
                'Chop the dark chocolate into small pieces and place in a heatproof bowl.',
                'In a small saucepan, heat the heavy cream and butter over medium heat until it just begins to simmer. Pour the hot cream mixture over the chopped chocolate and let it sit for 1-2 minutes.',
                'Stir the chocolate and cream together until smooth and glossy. Mix in vanilla extract.',
                'Cover the bowl with plastic wrap and refrigerate for at least 2 hours, or until the mixture is firm enough to scoop.',
                'Using a spoon or a small scoop, portion out the chocolate mixture and roll it into balls. Place the truffles on a baking sheet lined with parchment paper.',
                'Once all the truffles are rolled, place the baking sheet in the refrigerator for another 15-20 minutes to firm up the truffles.',
                'Roll the chilled truffles in cocoa powder, chopped nuts, or shredded coconut to coat them completely.',
                'Store the chocolate truffles in an airtight container in the refrigerator until ready to serve. Enjoy!',
            ]
        },
        {
            id: 10,
            name: 'Recipe 10',
            category: 'Dessert',
            rating: 2.7,
            description: 'Indulgent homemade chocolate truffles coated in cocoa powder, nuts, or shredded coconut.',
            imageUrl: 'https://fabrx.co/preview/tastebite/assets/images/menus/menu44.jpg',
            prepTime: '20 MIN',
            cookTime: '0 MIN',
            servings: '24 truffles',
            ingredients: [
                {
                    category: 'Truffles',
                    items: [
                        { name: 'Dark chocolate', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Heavy cream', quantity: 60, unitOfMeasurement: 'ml' },
                        { name: 'Butter', quantity: 40, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Coatings',
                    items: [
                        { name: 'Cocoa powder', quantity: 15, unitOfMeasurement: 'g' },
                        { name: 'Chopped nuts', quantity: 20, unitOfMeasurement: 'g' },
                        { name: 'Shredded coconut', quantity: 20, unitOfMeasurement: 'g' }
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '120' },
                { name: 'Protein', value: '1g' },
                { name: 'Fat', value: '9g' },
                { name: 'Carbohydrates', value: '9g' }
            ],
            instructions: [
                'Chop the dark chocolate into small pieces and place in a heatproof bowl.',
                'In a small saucepan, heat the heavy cream and butter over medium heat until it just begins to simmer. Pour the hot cream mixture over the chopped chocolate and let it sit for 1-2 minutes.',
                'Stir the chocolate and cream together until smooth and glossy. Mix in vanilla extract.',
                'Cover the bowl with plastic wrap and refrigerate for at least 2 hours, or until the mixture is firm enough to scoop.',
                'Using a spoon or a small scoop, portion out the chocolate mixture and roll it into balls. Place the truffles on a baking sheet lined with parchment paper.',
                'Once all the truffles are rolled, place the baking sheet in the refrigerator for another 15-20 minutes to firm up the truffles.',
                'Roll the chilled truffles in cocoa powder, chopped nuts, or shredded coconut to coat them completely.',
                'Store the chocolate truffles in an airtight container in the refrigerator until ready to serve. Enjoy!',
            ]
        },
        {
            id: 11,
            name: 'Recipe 11',
            category: 'Dessert',
            rating: 2.7,
            description: 'Indulgent homemade chocolate truffles coated in cocoa powder, nuts, or shredded coconut.',
            imageUrl: 'https://fabrx.co/preview/tastebite/assets/images/menus/menu122.jpg',
            prepTime: '20 MIN',
            cookTime: '0 MIN',
            servings: '24 truffles',
            ingredients: [
                {
                    category: 'Truffles',
                    items: [
                        { name: 'Dark chocolate', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Heavy cream', quantity: 60, unitOfMeasurement: 'ml' },
                        { name: 'Butter', quantity: 40, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Coatings',
                    items: [
                        { name: 'Cocoa powder', quantity: 15, unitOfMeasurement: 'g' },
                        { name: 'Chopped nuts', quantity: 20, unitOfMeasurement: 'g' },
                        { name: 'Shredded coconut', quantity: 20, unitOfMeasurement: 'g' }
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '120' },
                { name: 'Protein', value: '1g' },
                { name: 'Fat', value: '9g' },
                { name: 'Carbohydrates', value: '9g' }
            ],
            instructions: [
                'Chop the dark chocolate into small pieces and place in a heatproof bowl.',
                'In a small saucepan, heat the heavy cream and butter over medium heat until it just begins to simmer. Pour the hot cream mixture over the chopped chocolate and let it sit for 1-2 minutes.',
                'Stir the chocolate and cream together until smooth and glossy. Mix in vanilla extract.',
                'Cover the bowl with plastic wrap and refrigerate for at least 2 hours, or until the mixture is firm enough to scoop.',
                'Using a spoon or a small scoop, portion out the chocolate mixture and roll it into balls. Place the truffles on a baking sheet lined with parchment paper.',
                'Once all the truffles are rolled, place the baking sheet in the refrigerator for another 15-20 minutes to firm up the truffles.',
                'Roll the chilled truffles in cocoa powder, chopped nuts, or shredded coconut to coat them completely.',
                'Store the chocolate truffles in an airtight container in the refrigerator until ready to serve. Enjoy!',
            ]
        },
        {
            id: 12,
            name: 'Recipe 12',
            category: 'Dessert',
            rating: 2.7,
            description: 'Indulgent homemade chocolate truffles coated in cocoa powder, nuts, or shredded coconut.',
            imageUrl: 'https://fabrx.co/preview/tastebite/assets/images/menus/menu144.jpg',
            prepTime: '20 MIN',
            cookTime: '0 MIN',
            servings: '24 truffles',
            ingredients: [
                {
                    category: 'Truffles',
                    items: [
                        { name: 'Dark chocolate', quantity: 100, unitOfMeasurement: 'g' },
                        { name: 'Heavy cream', quantity: 60, unitOfMeasurement: 'ml' },
                        { name: 'Butter', quantity: 40, unitOfMeasurement: 'g' },
                        { name: 'Vanilla extract', quantity: 1, unitOfMeasurement: 'teaspoon' }
                    ]
                },
                {
                    category: 'Coatings',
                    items: [
                        { name: 'Cocoa powder', quantity: 15, unitOfMeasurement: 'g' },
                        { name: 'Chopped nuts', quantity: 20, unitOfMeasurement: 'g' },
                        { name: 'Shredded coconut', quantity: 20, unitOfMeasurement: 'g' }
                    ]
                }
            ],
            nutritionFacts: [
                { name: 'Calories', value: '120' },
                { name: 'Protein', value: '1g' },
                { name: 'Fat', value: '9g' },
                { name: 'Carbohydrates', value: '9g' }
            ],
            instructions: [
                'Chop the dark chocolate into small pieces and place in a heatproof bowl.',
                'In a small saucepan, heat the heavy cream and butter over medium heat until it just begins to simmer. Pour the hot cream mixture over the chopped chocolate and let it sit for 1-2 minutes.',
                'Stir the chocolate and cream together until smooth and glossy. Mix in vanilla extract.',
                'Cover the bowl with plastic wrap and refrigerate for at least 2 hours, or until the mixture is firm enough to scoop.',
                'Using a spoon or a small scoop, portion out the chocolate mixture and roll it into balls. Place the truffles on a baking sheet lined with parchment paper.',
                'Once all the truffles are rolled, place the baking sheet in the refrigerator for another 15-20 minutes to firm up the truffles.',
                'Roll the chilled truffles in cocoa powder, chopped nuts, or shredded coconut to coat them completely.',
                'Store the chocolate truffles in an airtight container in the refrigerator until ready to serve. Enjoy!',
            ]
        },
    ];

    constructor() { }

    getLatestRecipes(): Observable<Recipe[]> {
        return of(this.recipes);
    }

    getRecipe(id: number): Observable<Recipe> {
        return of(this.recipes.find(recipe => recipe.id === id)!);
    }
}
