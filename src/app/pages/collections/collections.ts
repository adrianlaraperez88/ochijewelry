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

    this.seo.setSchema({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Ochi Jewelry Collections',
      'description': 'Browse our fine jewelry collections: rings, chains, custom jewelry, bracelets, earrings, and pendants.',
      'mainEntity': {
        '@type': 'ItemList',
        'numberOfItems': 7,
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Gold Chains' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Pendants' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Rings' },
          { '@type': 'ListItem', 'position': 4, 'name': 'Engagement Rings' },
          { '@type': 'ListItem', 'position': 5, 'name': 'Bracelets' },
          { '@type': 'ListItem', 'position': 6, 'name': 'Earrings' },
          { '@type': 'ListItem', 'position': 7, 'name': 'Custom Jewelry' }
        ]
      }
    });
  }
}
