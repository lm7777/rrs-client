import { Component } from '@angular/core';
import { SearchListComponent } from '../../shared/search-list/search-list/search-list.component';

@Component({
  selector: 'app-demo',
  standalone: true,
    imports: [
        SearchListComponent
    ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  selectedValues: string = '';
}
