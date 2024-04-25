import { Component } from '@angular/core';
import { SearchListComponent } from '../../shared/search-list/search-list.component';

@Component({
    selector: 'rrs-demo',
    standalone: true,
    imports: [
        SearchListComponent
    ],
    templateUrl: './demo.component.html',
    styleUrl: './demo.component.scss'
})
export class DemoComponent {
    ingredients: string[] = ['beer', 'fanta', 'schnapps', 'milk', 'almond', 'sprite', 'egg', 'cheese', 'vanilla', 'flour', 'ham', 'pork'];
    selectedValues: string[] = [];

    onSelect(value: string) {
        this.selectedValues.push(value);
    }
}
