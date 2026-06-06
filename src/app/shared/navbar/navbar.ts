import { Component, HostListener, OnInit, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FeatureFlagService } from '../../core/services/feature-flag.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, CommonModule, NgOptimizedImage],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent implements OnInit {
  ff = inject(FeatureFlagService);
  isScrolled = signal(false);
  menuOpen = signal(false);
  currentLang = signal('es');

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.currentLang.set(localStorage.getItem('ochi-lang') || 'es');
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  switchLang(lang: string) {
    this.currentLang.set(lang);
    this.translate.use(lang);
    localStorage.setItem('ochi-lang', lang);
    this.closeMenu();
  }
}
