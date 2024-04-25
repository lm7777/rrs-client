import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'rrs-search-list',
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
        switch (event.key) {
            case 'Enter':
                this.onSelectItem(this.searchValue);
                break;
            case 'Escape':
                this.resetFilter();
                break;
        }
    }

    onSelectItem(value: string): void {
        this.resetFilter();
        this.onSelect.emit(value);
    }

    resetFilter() {
        this.searchValue = '';
        this.showOptions = false;
        this.filteredOptions = this.options;
    }
}
