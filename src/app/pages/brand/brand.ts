import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './brand.html',
  styleUrl: './brand.scss',
})
export class BrandComponent implements OnInit {
  private seo = inject(SEOService);
  copiedColor = signal<string | null>(null);

  colors = [
    { name: 'Gold (Primary)', hex: '#C9A84C', var: '--color-gold', description: 'Brand core. Primary buttons, icons, accents.', darkText: true },
    { name: 'Light Gold', hex: '#E8C96D', var: '--color-gold-light', description: 'Primary button hover states, focus outlines.', darkText: true },
    { name: 'Dark Gold', hex: '#9A7A30', var: '--color-gold-dark', description: 'Secondary borders, icons, background glows.', darkText: false },
    { name: 'Obsidian Black', hex: '#0A0A0A', var: '--color-black', description: 'Main page background color.', darkText: false },
    { name: 'Obsidian Dark', hex: '#111111', var: '--color-dark', description: 'Secondary page section backgrounds.', darkText: false },
    { name: 'Alabaster Text', hex: '#F5F0E8', var: '--color-text', description: 'Primary typography, headings, high contrast text.', darkText: true },
  ];

  ngOnInit() {
    this.seo.setTags({
      titleKey: 'Brand Guidelines | Ochi Jewelry',
      descriptionKey: 'Official brand guidelines, design system, colors, typography, and styling components for Ochi Jewelry.',
      keywordsKey: 'design system, brand style guide, color palette, typography, ochi jewelry',
    });
  }

  copyColor(hex: string) {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(hex).then(() => {
        this.copiedColor.set(hex);
        setTimeout(() => {
          this.copiedColor.set(null);
        }, 2000);
      });
    }
  }
}
