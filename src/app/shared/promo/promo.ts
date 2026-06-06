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
    { key: 'ring',     img: 'promo-ring.png',     badge: 'badge_sale' },
    { key: 'necklace', img: 'promo-necklace.png', badge: 'badge_limited' },
    { key: 'bracelet', img: 'promo-bracelet.png', badge: 'badge_new' },
  ];
}
