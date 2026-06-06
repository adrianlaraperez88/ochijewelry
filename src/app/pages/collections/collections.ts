import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [TranslateModule, NgOptimizedImage],
  templateUrl: './collections.html',
  styleUrl: './collections.scss',
})
export class CollectionsComponent implements OnInit {
  private seo = inject(SEOService);

  categories = [
    { key: 'chains',    img: 'chains.webp',    icon: '⛓️' },
    { key: 'pendants',  img: 'pendants.webp',  icon: '💫' },
    { key: 'rings',     img: 'rings.webp',     icon: '💍' },
    { key: 'engagement',img: 'rings.webp',     icon: '💎' },
    { key: 'bracelets', img: 'bracelets.webp', icon: '✨' },
    { key: 'earrings',  img: 'earrings.webp',  icon: '🌟' },
    { key: 'custom',    img: 'custom.webp',    icon: '🎨' },
  ];

  ngOnInit() {
    this.seo.setTags({
      titleKey: 'seo.collections.title',
      descriptionKey: 'seo.collections.desc',
      keywordsKey: 'seo.collections.keywords',
      image: 'https://www.ochijewelry.com/assets/images/chains.webp'
    });
  }
}
