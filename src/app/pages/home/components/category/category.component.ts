import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocktailService } from '../../../../services/cocktail.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  cocktails: any[] = [];

  constructor(private router: Router, private route : ActivatedRoute, private cocktailService: CocktailService){}

  ngOnInit(): void {
    this.cocktailService.getCategory().subscribe ({
      next: (data) => (this.categories = data.drinks),
      error: (err) => console.error(`Error fetching cocktails:`, err)
    });
  }

  onCategoryClick(category: string): void {
    if (category) {
      this.cocktailService.getCocktailsByCategory(category).subscribe(res => {
        this.cocktails = res.drinks;
        this.cocktailService.setData({ drinks: this.cocktails }); 
        this.router.navigate(['/list']);   
      });
    }

  }
}
