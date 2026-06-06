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
    { key: 'chains',    img: 'chains.png',    icon: '⛓️' },
    { key: 'pendants',  img: 'pendants.png',  icon: '💫' },
    { key: 'rings',     img: 'rings.png',     icon: '💍' },
    { key: 'engagement',img: 'rings.png',     icon: '💎' },
    { key: 'bracelets', img: 'bracelets.png', icon: '✨' },
    { key: 'earrings',  img: 'earrings.png',  icon: '🌟' },
    { key: 'custom',    img: 'custom.png',    icon: '🎨' },
  ];

  ngOnInit() {
    this.seo.setTags({
      titleKey: 'seo.collections.title',
      descriptionKey: 'seo.collections.desc',
      keywordsKey: 'seo.collections.keywords',
      image: 'https://www.ochijewelry.com/assets/images/chains.png'
    });
  }
}
