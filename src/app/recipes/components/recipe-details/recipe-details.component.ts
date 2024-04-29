import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Recipe } from "../../data/recipe.model";
import { RecipeService } from "../../services/recipe.service";

@Component({
    selector: 'rrs-recipe-details',
    standalone: true,
    imports: [],
    providers: [RecipeService, Recipe],
    templateUrl: './recipe-details.component.html',
    styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit{

    stars: string[] = [];
    constructor( private route: ActivatedRoute,
                 public recipe: Recipe,
                 private recipeService: RecipeService) {
    }
    ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                    const recipeId= +params['id'];
                     this.recipe = this.recipeService.getRecipe(recipeId);
                }
            );

        const fullStars = Math.floor(this.recipe.rating);
        const halfStar = this.recipe.rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        this.stars = Array(fullStars).fill('star')
            .concat(halfStar ? ['star_half'] : [])
            .concat(Array(emptyStars).fill('star_border'));
    }
}
