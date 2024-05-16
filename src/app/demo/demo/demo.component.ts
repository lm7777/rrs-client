import { Component } from '@angular/core';
import { SearchListComponent } from '../../shared/components/search-list/search-list.component';
import { InputComponent } from "../../shared/components/input/input.component";
import {StarRatingComponent} from "../../shared/components/star-rating/star-rating.component";

@Component({
    selector: 'rrs-demo',
    standalone: true,
    imports: [
        SearchListComponent,
        InputComponent,
        StarRatingComponent
    ],
    templateUrl: './demo.component.html',
    styleUrl: './demo.component.scss'
})
export class DemoComponent {
    ingredients: string[] = ['beer', 'fanta', 'schnapps', 'milk', 'almond', 'sprite', 'egg', 'cheese', 'vanilla', 'flour', 'ham', 'pork'];
    selectedValues: string[] = [];
    inputText1: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit for input1.';
    inputText2: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit for input2.';

    onValueChanged(value: string): void {
        this.inputText1 = value;
    }

    onValueChanged2(value: string): void {
        this.inputText2 = value;
    }

    onSelect(value: string): void {
        const values: string[] = value.split(',');
        values.forEach(v => {
            const item: string = v.trim();
            this.selectedValues.push(item);
            const index: number = this.ingredients.indexOf(item);
            if (index > -1) {
                this.ingredients = [...this.ingredients.slice(0, index), ...this.ingredients.slice(index + 1)];
            }
        });
    }
}
