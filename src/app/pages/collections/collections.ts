import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
  private translate = inject(TranslateService);

  categories = [
    { key: 'chains',    img: 'chains.webp',    icon: '⛓️' },
    { key: 'pendants',  img: 'pendants.webp',  icon: '💫' },
    { key: 'rings',     img: 'rings.webp',     icon: '💍' },
    { key: 'engagement',img: 'rings.webp',     icon: '💎' },
    { key: 'bracelets', img: 'bracelets.webp', icon: '✨' },
    { key: 'earrings',  img: 'earrings.webp',  icon: '🌟' },
    { key: 'custom',    img: 'custom.webp',    icon: '🎨' },
  ];

  // Customizer state signals
  customizerStep = signal(1);
  selectedCategory = signal<string | null>(null);
  selectedMetal = signal<string | null>(null);
  selectedStone = signal<string | null>(null);

  metalOptions = ['gold_18k', 'white_gold', 'rose_gold', 'platinum', 'silver'];
  stoneOptions = ['diamond', 'emerald', 'ruby', 'sapphire', 'none'];

  ngOnInit() {
    this.seo.setTags({
      titleKey: 'seo.collections.title',
      descriptionKey: 'seo.collections.desc',
      keywordsKey: 'seo.collections.keywords',
      image: 'https://www.ochijewelry.com/assets/images/chains.webp'
    });

    this.translate.get([
      'contact.info.address',
      'contact.info.phone',
      'contact.info.email'
    ]).subscribe(res => {
      const addressVal = res['contact.info.address'] || '';
      const phoneVal = res['contact.info.phone'] || '';
      const emailVal = res['contact.info.email'] || '';

      const addrParts = addressVal.split(',');
      const street = addrParts[0]?.trim() || '';
      const city = addrParts[1]?.trim() || '';
      const stateZip = addrParts[2]?.trim().split(' ') || [];
      const state = stateZip[0] || '';
      const zip = stateZip[1] || '';

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
    });
  }

  // Customizer controller methods
  selectCategory(key: string) {
    this.selectedCategory.set(key);
    this.nextStep();
  }

  selectMetal(key: string) {
    this.selectedMetal.set(key);
    this.nextStep();
  }

  selectStone(key: string) {
    this.selectedStone.set(key);
    this.nextStep();
  }

  nextStep() {
    this.customizerStep.update(s => s + 1);
  }

  prevStep() {
    this.customizerStep.update(s => Math.max(1, s - 1));
  }

  resetCustomizer() {
    this.selectedCategory.set(null);
    this.selectedMetal.set(null);
    this.selectedStone.set(null);
    this.customizerStep.set(1);
  }

  getWhatsAppLink(): string {
    const category = this.selectedCategory();
    const metal = this.selectedMetal();
    const stone = this.selectedStone();

    // Map keys to readable text based on active lang
    const isEn = this.translate.currentLang === 'en';
    
    let text = '';
    if (isEn) {
      text = `Hello! I would like to request a consultation for a custom jewelry piece.\n` +
             `- Category: ${category}\n` +
             `- Metal: ${metal}\n` +
             `- Stone: ${stone}`;
    } else {
      text = `¡Hola! Me gustaría solicitar una consulta para una joya personalizada.\n` +
             `- Categoría: ${category}\n` +
             `- Metal: ${metal}\n` +
             `- Piedra: ${stone}`;
    }

    return `https://wa.me/15029562317?text=${encodeURIComponent(text)}`;
  }
}
