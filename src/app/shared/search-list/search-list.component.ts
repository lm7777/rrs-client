import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search-list',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './search-list.component.html',
    styleUrl: './search-list.component.scss'
})
export class SearchListComponent implements OnInit {
    @Input() placeholder: string = 'Search...';
    @Input() options: string[] = [];
    @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();

    searchValue: string = '';
    filteredOptions: string[] = [];
    showOptions: boolean = false;

    ngOnInit(): void {
        this.filteredOptions = this.options;
    }

    onSearchValueChanged(event: Event): void {
        this.showOptions = true;
        const filterValue: string = (event.target as HTMLInputElement).value.toLowerCase();
        this.filteredOptions = this.options.filter(f => f.toLowerCase().includes(filterValue));
    }

    onKeydown(event: KeyboardEvent) {
        if (event.key == 'Enter') {
            this.onSelectItem(this.searchValue);
        }
        else if(event.key == 'Escape') {
            this.resetFilter();
            this.showOptions = false;
        }
    }

    onSelectItem(value: string): void {
        this.resetFilter();
        this.onSelect.emit(value);
    }

    resetFilter() {
        this.searchValue = '';
        this.filteredOptions = this.options;
    }
}
