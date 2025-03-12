import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home/home.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, RouterOutlet, RouterLink, RouterLinkActive],
  template:     
  `
  <main>
      <header class="brand-name">      
      </header>
      <section class="content">
      </section>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Cocktails';
}
