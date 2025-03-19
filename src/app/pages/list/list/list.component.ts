import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../../../services/cocktail.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  cocktails: any[] = [];
  category: string = "";
  filteredCocktails: any[] = [];
  currentList: any[] = []; 
  alcoholicCocktails: any[] = [];

  paginatedCocktails: any[] = []; 
  pageSize: number = 9; 
  currentPage: number = 1; 
  totalPages: number = 1;

  constructor(private route: ActivatedRoute, private router: Router, private cocktailService: CocktailService) {}

  ngOnInit(): void {

    this.cocktailService.getData().subscribe(res => {
      this.cocktails = res.drinks;
      console.log('API List:', this.cocktails);
    });
  
    this.cocktailService.getData().subscribe(res => {
      this.alcoholicCocktails = res.drinks;
    });
  
      this.totalPages = Math.ceil(this.cocktails.length / this.pageSize);
      this.currentList = [...this.cocktails];
      this.updatePage();  
  }

  updatePage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCocktails = this.currentList.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }
  
  onBackClick(): void{
    this.router.navigate(['']);
  }

  onFilterClick(filterType: 'Alcoholic' | 'All'): void {
    if (filterType === 'Alcoholic') {
      if (this.alcoholicCocktails.length === 0) {
        console.warn('The list is empty');
        this.currentList = [...this.cocktails]; // 
      } else {
        this.filterCocktails('Alcoholic');
      }
    } else {
      this.currentList = [...this.cocktails];
    }
  
    this.updatePage();
    console.log('The current list:', this.currentList);
  }

  filterCocktails(filterType: 'Alcoholic' | 'All'): void {
    if (filterType === 'Alcoholic') {
      this.filteredCocktails = this.cocktails.filter(cocktail =>
        this.alcoholicCocktails.some(alcoholicItem => alcoholicItem.idDrink === cocktail.idDrink)
      );

      if (this.filteredCocktails.length === 0) {
        console.warn('The requested data was not found');
        }
      } else {
      this.filteredCocktails = [...this.cocktails];
      }

      this.currentList = [...this.filteredCocktails];
  }

}