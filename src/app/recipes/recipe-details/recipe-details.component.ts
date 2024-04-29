import { Component, OnInit}  from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Component({
    selector: 'rrs-recipe-details',
    standalone: true,
    imports: [],
    providers: [RecipeService, Recipe],
    templateUrl: './recipe-details.component.html',
    styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit{
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
    }
}
