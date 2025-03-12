import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../list/list/list.component';
import { CategoryComponent } from '../components/category/category.component';
import { CocktailService } from '../../../services/cocktail.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CategoryComponent],
  template: `
  <p>home works!</p>
  <div class="wrap">
      <div class="search">
        <input type="text" class="searchTerm" placeholder="Search the cocktail by name or ingredients">
        <button type="submit" class="searchButton">
              <i class="fa fa-search"></i>
        </button>
      </div>
  </div>
  <button class="close-button" (click)="getRandomCocktail()">Random Cocktail</button>
  <div class="cocktail-list-container">
  <app-category></app-category>
  </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  drinks: any[] = [];

  constructor(private router: Router, private route : ActivatedRoute, private cocktailService: CocktailService){}

  onCheckClick(): void {
    console.log('按钮被点击');
  }

  getRandomCocktail(): void {
    this.router.navigate(['/detail', 'random.php']);
  }
}
