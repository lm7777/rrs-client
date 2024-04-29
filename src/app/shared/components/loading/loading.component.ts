import { Component, Input } from '@angular/core';

@Component({
  selector: 'rrs-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
    @Input() loading = false;
    @Input() text: string = 'Loading...';
}
