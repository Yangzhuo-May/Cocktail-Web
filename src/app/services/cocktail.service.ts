import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private url = 'https://www.thecocktaildb.com/api/json/v1/1/';
  constructor(private http: HttpClient) { }

  categoryMap: { [key: string]: string } = {
    'Cocktail': 'Cocktail',
    'Ordinary Drink': 'Ordinary_Drink',
    'Punch / Party Drink': 'Cocktail',
    'Shake': 'Shake',
    'Other / Unknown': 'Cocktail',
    'Cocoa': 'Cocoa',
    'Shot': 'Shot',
    'Coffee / Tea': 'Cocktail',
    'Homemade Liqueur': 'Homemade_Liqueur',
    'Beer': 'Beer',
    'Soft Drink': 'Soft_Drink'
  };

  getCategory(): Observable<any> {
    return this.http.get(`${this.url}list.php?c=list`);
  }

  getCocktailsByCategory(category: string): Observable<any> {
    const apiCategory = this.categoryMap[category] || category;
    return this.http.get(`${this.url}filter.php?c=${apiCategory}`);
  }

  getCocktailsById(id: string): Observable<any> {
    // const apiId = 'lookup.php?i=';
    return this.http.get(`${this.url}${id}`);
  }

  getRandomCocktail(): Observable<any> {
    const apiId = 'random.php';
    return this.http.get(`${this.url}${apiId}`);
  }
}
