import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
  `]
})
export class App implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.setDefaultLang('es');
    
    let activeLang = 'es';
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      
      if (urlLang && (urlLang === 'en' || urlLang === 'es')) {
        activeLang = urlLang;
        localStorage.setItem('ochi-lang', activeLang);
      } else {
        activeLang = localStorage.getItem('ochi-lang') || 'es';
      }
    }
    
    this.translate.use(activeLang);
  }
}
