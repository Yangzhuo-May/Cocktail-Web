import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../list/list/list.component';
import { CategoryComponent } from '../components/category/category.component';
import { CocktailService } from '../../../services/cocktail.service';
import { ActivatedRoute, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CategoryComponent, FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  drinks: any[] = [];

  constructor(private router: Router, private route : ActivatedRoute, private cocktailService: CocktailService){}

  getRandomCocktail(): void {
    this.router.navigate(['/detail', 'random.php']);
  }

  searchText: string = '';  
  filteredCocktails: any[] = []; 

  onSearchClick(): void {
    if (this.searchText) {
      this.cocktailService.searchCocktailByName(this.searchText).subscribe(res => {
        this.drinks = res.drinks;
        this.cocktailService.setData({ drinks: this.drinks });  
      });
      this.router.navigate(['/list']); 
    } else {
      
    }
  }
}
