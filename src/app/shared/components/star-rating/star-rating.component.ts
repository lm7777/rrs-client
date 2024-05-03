import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
    selector: 'rrs-star-rating',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './star-rating.component.html',
    styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements OnInit {
    @Input() rating: number = 0;
    @Input() reviewCount: number = 0;
    @Input() reviewMode = false;
    @ViewChildren('starsList') starsList: QueryList<ElementRef>;

    stars: string[] = [];
    selectedStars: number = 0;
    hoveredStars: number = 0;

    ngOnInit(): void {
        const maxStarNumber: number = 5;

        const fullStars: number = Math.floor(this.rating);
        const halfStar: number = (this.rating % 1 >= 0.5) ? 1 : 0;
        const emptyStars: number = maxStarNumber - fullStars - halfStar;

        this.stars = Array(fullStars).fill('star')
            .concat(halfStar ? ['star_half'] : [])
            .concat(Array(emptyStars).fill('star_border'));
    }

    countStar(star: number) {
        if (this.reviewMode) {
            this.selectedStars = star;
        }
    }

    addClass(star: number) {
        if (this.reviewMode) {
            this.hoveredStars = star + 1;

            for (let i = 0; i <= star; i++) {
                this.starsList.toArray()[i].nativeElement.classList.add('selected');
            }
        }
    }

    removeClass(star: number) {
        if (this.reviewMode) {
            this.hoveredStars = 0;
            for (let i = star; i >= this.selectedStars; i--) {
                this.starsList.toArray()[i].nativeElement.classList.remove('selected');
            }
        }
    }
}
