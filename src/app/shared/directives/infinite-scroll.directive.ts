import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[infiniteScroll]',
    standalone: true
})
export class InfiniteScrollDirective implements AfterViewInit, OnInit {
    @Output() infiniteScroll: EventEmitter<boolean> = new EventEmitter<boolean>();
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
                this.infiniteScroll.emit(true);
            }
        }, {threshold: 0.5});
    }
}
