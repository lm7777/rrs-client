import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
    selector: 'rrs-header',
    standalone: true,
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    constructor(private navigationService: NavigationService) {
    }

    navigateToHome() {
        this.navigationService.navigateToHome();
    }
}
