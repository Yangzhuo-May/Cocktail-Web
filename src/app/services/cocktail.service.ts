import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private url = 'https://www.thecocktaildb.com/api/json/v1/1/';
  constructor(private http: HttpClient) { }

  categoryMap: { [key: string]: string } = {
    'Cocktail': 'Cocktail',
    'Ordinary Drink': 'Ordinary_Drink',
    'Punch / Party Drink': 'Punch%20/%20Party%20Drink',
    'Shake': 'Shake',
    'Other / Unknown': 'Other%20/%20Unknown',
    'Cocoa': 'Cocoa',
    'Shot': 'Shot',
    'Coffee / Tea': 'Coffee%20/%20Tea',
    'Homemade Liqueur': 'Homemade_Liqueur',
    'Beer': 'Beer',
    'Soft Drink': 'Soft_Drink'
  };
  
  private dataList = new BehaviorSubject<{ drinks: any[] }>({ drinks: [] });
  cocktails$ = this.dataList.asObservable();

  private alcoholicCocktails: { drinks: any[] } = { drinks: [] };

  setData(data: { drinks: any[] }): void {
    this.dataList.next(data);
    console.log('set data:', data);
  }

  getData(): Observable<{ drinks: any[] }> {
    return this.dataList.asObservable(); 
  }

  getCategory(): Observable<any> {
    return this.http.get(`${this.url}list.php?c=list`);
  }

  getCocktailsByCategory(category: string): Observable<any> {
    const apiCategory = this.categoryMap[category] || category;
    return this.http.get(`${this.url}filter.php?c=${apiCategory}`);
  }

  getCocktailsById(id: string): Observable<any> {
    return this.http.get(`${this.url}${id}`);
  }

  searchCocktailByName(name: string): Observable<any> {
    const apiId = 'search.php?s=';
    return this.http.get(`${this.url}${apiId}${name}`);
  }

  getCocktailsByAlcoholic(filterType: 'Alcoholic' | 'Non_Alcoholic'): Observable<any> {
    const apiFliterAl = `filter.php?a=`;
    return this.http.get(`${this.url}${apiFliterAl}${filterType}`)
  }

  getAlcoholicCocktails(): Observable<any> {

    if (this.alcoholicCocktails.drinks && this.alcoholicCocktails.drinks.length > 0){
      return of(this.alcoholicCocktails.drinks);
    }

    return this.http.get<any>(`${this.url}filter.php?a=Alcoholic`).pipe(
      map(response => {
        this.alcoholicCocktails.drinks = response.drinks || [];
        return this.alcoholicCocktails.drinks ;
      }),
      catchError(error => {
        console.error('API request failed.', error);
        return of([]);
      })
    )
  }
}
