import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {InputComponent} from "./shared/input/input.component";

@Component({
  selector: 'rrs-root',
  standalone: true,
    imports: [RouterOutlet, HeaderComponent, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rrs';
}
