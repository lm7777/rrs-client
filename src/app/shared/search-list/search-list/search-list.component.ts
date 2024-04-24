import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-search-list',
    standalone: true,
    imports: [],
    templateUrl: './search-list.component.html',
    styleUrl: './search-list.component.scss'
})
export class SearchListComponent implements OnInit {
    @Input() placeholder: string = 'Search...';
    @Input() options: string[] = [];
    @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

    filteredOptions: string[] = [];
    showOptions: boolean = false;

    ngOnInit(): void {
        this.filteredOptions = this.options;
    }

    onSearchValueChanged(event: Event): void {
        const filterValue: string = (event.target as HTMLInputElement).value.toLowerCase();
        this.filteredOptions = this.options.filter(f => f.toLowerCase().includes(filterValue));
    }

    onSelectItem(value: string): void {
        this.inputElement.nativeElement.value = '';
        this.onSelect.emit(value);
    }
}
