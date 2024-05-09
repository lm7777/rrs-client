import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../data/recipe.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { delay, finalize, Subscription } from 'rxjs';
import { IntersectionComponent } from '../../../shared/components/intersection/intersection.component';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { NavigationService } from '../../../shared/services/navigation.service';

@Component({
    selector: 'rrs-recipes-list',
    standalone: true,
    providers: [],
    imports: [IntersectionComponent, LoadingComponent, StarRatingComponent],
    templateUrl: './recipes-list.component.html',
    styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnDestroy, AfterViewInit {
    loading: boolean = false;
    recipesList: Recipe[] = [];

    @ViewChild('recipesListRef') recipesListRef: ElementRef;
    private getLatestRecipesSubscription: Subscription;
    private recipeCardWidth: number = 350;
    private recipeCardHeight: number = 322;
    private recipeCardGap: number = 30;
    private limit: number = 20;

    constructor(private recipeService: RecipeService,
                private navigationService: NavigationService) {
    }

    ngAfterViewInit(): void {
        const elem = this.recipesListRef.nativeElement;
        const columns: number = Math.floor(elem.offsetWidth / (this.recipeCardWidth + this.recipeCardGap));
        const rows: number = Math.ceil(elem.offsetHeight / (this.recipeCardHeight + this.recipeCardGap)) + 1;
        this.limit = columns * rows;
    }

    ngOnDestroy(): void {
        this.getLatestRecipesSubscription?.unsubscribe();
    }

    loadRecipes(): void {
        this.loading = true;
        this.getLatestRecipesSubscription?.unsubscribe();
        this.getLatestRecipesSubscription = this.recipeService.getLatestRecipes(this.limit)
            .pipe(delay(500))
            .pipe(finalize(() => {
                this.loading = false;
            }))
            .subscribe((result: Recipe[]) => {
                this.recipesList.push(...result);
            });
    }

    navigateToRecipeDetails(recipeId: number) {
        this.navigationService.navigateToRecipeDetails(recipeId);
    }
}


