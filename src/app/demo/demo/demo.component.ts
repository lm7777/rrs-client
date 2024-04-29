import { Component } from '@angular/core';
import { SearchListComponent } from '../../shared/components/search-list/search-list.component';
import { InputComponent } from "../../shared/components/input/input.component";

@Component({
    selector: 'rrs-demo',
    standalone: true,
    imports: [
        SearchListComponent,
        InputComponent
    ],
    templateUrl: './demo.component.html',
    styleUrl: './demo.component.scss'
})
export class DemoComponent {
    ingredients: string[] = ['beer', 'fanta', 'schnapps', 'milk', 'almond', 'sprite', 'egg', 'cheese', 'vanilla', 'flour', 'ham', 'pork'];
    selectedValues: string[] = [];

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
