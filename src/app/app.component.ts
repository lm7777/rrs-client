import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'rrs-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rrs';
}
