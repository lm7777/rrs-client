import { Component, Input } from '@angular/core';

@Component({
  selector: 'rrs-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
    @Input() labelContent: string;
}
