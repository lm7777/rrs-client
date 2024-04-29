import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';

@Component({
    selector: 'rrs-search-list',
    standalone: true,
    imports: [FormsModule, InputComponent],
    templateUrl: './search-list.component.html',
    styleUrl: './search-list.component.scss'
})
export class SearchListComponent implements OnChanges {
    @Input() placeholder: string = 'Search...';
    @Input() options: string[] = [];
    @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();

    searchValue: string = '';
    searchOptions: string[] = [];
    showOptions: boolean = false;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.options) {
            this.searchOptions = changes.options.currentValue;
        }
    }

    onValueChanged(value: string): void {
        this.searchValue = value;
        this.showOptions = true;
        this.searchOptions = this.options.filter(f => f.toLowerCase().includes(value));
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
        this.searchOptions = this.options;
    }
}
