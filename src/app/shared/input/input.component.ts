import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-input',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
    @Input() type: string = '';
    @Input() placeholder: string = '';
}
