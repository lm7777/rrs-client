import { Component } from '@angular/core';
import {SearchListComponent} from "../shared/components/search-list/search-list.component";

@Component({
  selector: 'rrs-profile',
  standalone: true,
    imports: [
        SearchListComponent
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    ingredients: string[] = ['beer', 'fanta', 'schnapps', 'milk', 'almond', 'sprite', 'egg', 'cheese', 'vanilla', 'flour', 'ham', 'pork'];
    likedIngredients: string[] = [];
    avoidIngredients: string[] = [];

    onSelect(value: string, liked: boolean): void {
        const values: string[] = value.split(',');
        values.forEach(v => {
            const item: string = v.trim();
            liked ? this.likedIngredients.push(item) : this.avoidIngredients.push(item);
            const index: number = this.ingredients.indexOf(item);
            if (index > -1) {
                this.ingredients = [...this.ingredients.slice(0, index), ...this.ingredients.slice(index + 1)];
            }
        });
    }

    onDeleteIngredient(index: number, liked: boolean) {
        liked ? this.likedIngredients.splice(index, 1) : this.avoidIngredients.splice(index, 1);
    }
}
