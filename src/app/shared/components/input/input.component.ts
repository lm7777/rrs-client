import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'rrs-input',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
    @Input() value: string = '';
    @Input() type: string = 'text';
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Input() showClearIcon: boolean = false;

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() valueClear: EventEmitter<string> = new EventEmitter<string>();
    @Output() focus: EventEmitter<string> = new EventEmitter();
    @Output() blur: EventEmitter<string> = new EventEmitter();

    onInputChanged() {
        this.valueChange.emit(this.value);
    }

    onClearValue()
    {
        this.value = '';
        this.valueClear.emit();
    }
}
