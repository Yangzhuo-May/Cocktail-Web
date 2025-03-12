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

  paginatedCocktails: any[] = []; // 当前页显示的数据
  pageSize: number = 5; // 每页显示多少条
  currentPage: number = 1; // 当前页码
  totalPages: number = 1; // 总页数

  constructor(private route: ActivatedRoute, private router: Router, private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log("paramMap.subscribe() 被触发！");
      this.category = params.get('category') || '';  // 获取 category 参数
      console.log(`接收到的类别: ${this.category}`);

      if (this.category) {
        this.cocktailService.getCocktailsByCategory(this.category).subscribe(res => {
          this.cocktails = res.drinks;
          console.log('获取到的鸡尾酒数据:', res);
          this.totalPages = Math.ceil(this.cocktails.length / this.pageSize);
          this.updatePage();
        });
      }
    });
  }

  updatePage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCocktails = this.cocktails.slice(startIndex, endIndex);
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
}