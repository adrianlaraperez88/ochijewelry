import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-promo',
  standalone: true,
  imports: [TranslateModule, NgOptimizedImage],
  templateUrl: './promo.html',
  styleUrl: './promo.scss',
})
export class PromoComponent {
  promos = [
    { key: 'ring',     img: 'promo-ring.webp',     badge: 'badge_sale' },
    { key: 'necklace', img: 'promo-necklace.webp', badge: 'badge_limited' },
    { key: 'bracelet', img: 'promo-bracelet.webp', badge: 'badge_new' },
  ];
}
