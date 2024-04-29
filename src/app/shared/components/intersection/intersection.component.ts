import { Component, EventEmitter, Output } from '@angular/core';
import { IntersectionDirective } from '../../directives/intersection.directive';

@Component({
  selector: 'rrs-intersection',
  standalone: true,
  imports: [IntersectionDirective],
  templateUrl: './intersection.component.html',
  styleUrl: './intersection.component.scss'
})
export class IntersectionComponent {
    @Output() onIntersection: EventEmitter<string> = new EventEmitter<string>();
}
