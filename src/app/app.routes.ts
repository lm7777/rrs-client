import { Routes } from '@angular/router';
import { DemoComponent } from './demo/demo/demo.component';
import { RecipeDetailsComponent } from "./recipes/components/recipe-details/recipe-details.component";
import { RecipesListComponent } from './recipes/components/recipes-list/recipes-list.component';
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
    {path: '', component: RecipesListComponent},
    {path: 'demo', component: DemoComponent},
    {path: 'recipe/:id', component: RecipeDetailsComponent},
    {path: 'profile', component: ProfileComponent},
];
