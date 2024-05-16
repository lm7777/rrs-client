import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { ConfigService } from './shared/services/config.service';

@Component({
    selector: 'rrs-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    constructor(private configService: ConfigService) {
        this.configService.init();
    }

    title = 'rrs';
}
