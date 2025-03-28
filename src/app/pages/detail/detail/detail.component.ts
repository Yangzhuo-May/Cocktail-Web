import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../../../services/cocktail.service';
import { ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  drinks: any[] = [];
  id: string = '';

  constructor(private location: Location, private route: ActivatedRoute, private router: Router, private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.id = params.get('id') || '';

      if (this.id) {
        this.cocktailService.getCocktailsById(this.id).subscribe(res => {
          this.drinks = res.drinks;
        });
      }
    }); 
  }

  goBack(): void {
    this.location.back();
  }
  
}
