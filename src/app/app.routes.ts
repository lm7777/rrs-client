import { Routes } from '@angular/router';
import { DemoComponent } from './demo/demo/demo.component';
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";

export const routes: Routes = [
    { path: 'demo', component: DemoComponent },
    { path: 'recipe/:id', component: RecipeDetailsComponent },
];
