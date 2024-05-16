import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[intersection]',
    standalone: true
})
export class IntersectionDirective implements AfterViewInit, OnInit {
    @Output() intersection: EventEmitter<boolean> = new EventEmitter<boolean>();
    observer!: IntersectionObserver;

    constructor(private element: ElementRef,
                @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.intersectionObserver();
        }
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.observer.observe(this.element.nativeElement);
        }
    }

    intersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.intersection.emit(true);
            }
        }, {threshold: 1});
    }
}
