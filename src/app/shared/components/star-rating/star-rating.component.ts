import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'rrs-star-rating',
    standalone: true,
    imports: [],
    templateUrl: './star-rating.component.html',
})
export class StarRatingComponent implements OnInit {
    @Input() rating: number = 0;
    @Input() reviewCount: number = 0;

    stars: string[] = [];

    ngOnInit(): void {
        const maxStarNumber: number = 5;

        const fullStars: number = Math.floor(this.rating);
        const halfStar: number = (this.rating % 1 >= 0.5) ? 1 : 0;
        const emptyStars: number = maxStarNumber - fullStars - halfStar;

        this.stars = Array(fullStars).fill('star')
            .concat(halfStar ? ['star_half'] : [])
            .concat(Array(emptyStars).fill('star_border'));
    }
}
