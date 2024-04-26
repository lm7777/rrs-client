import { Routes } from '@angular/router';
import { DemoComponent } from './demo/demo/demo.component';
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';

export const routes: Routes = [
    {path: '', component: RecipesListComponent},
    {path: 'demo', component: DemoComponent},
    {path: 'recipe/:id', component: RecipeDetailsComponent},
];
