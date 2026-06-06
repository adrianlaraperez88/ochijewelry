import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FeatureFlagService } from '../../core/services/feature-flag.service';
import { PromoComponent } from '../../shared/promo/promo';
import { NgOptimizedImage } from '@angular/common';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslateModule, PromoComponent, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  ff = inject(FeatureFlagService);
  private seo = inject(SEOService);

  highlights = [
    { icon: '💎', key: 'quality' },
    { icon: '⚡', key: 'fast' },
    { icon: '✨', key: 'custom' },
    { icon: '🏆', key: 'trust' },
  ];

  ngOnInit() {
    this.seo.setTags({
      titleKey: 'seo.home.title',
      descriptionKey: 'seo.home.desc',
      keywordsKey: 'seo.home.keywords',
      image: 'https://www.ochijewelry.com/assets/images/hero.png'
    });

    this.seo.setSchema({
      '@context': 'https://schema.org',
      '@type': 'JewelryStore',
      'name': 'Ochi Jewelry',
      'image': 'https://www.ochijewelry.com/assets/images/hero.png',
      'logo': 'https://www.ochijewelry.com/assets/images/logo.png',
      '@id': 'https://www.ochijewelry.com/#store',
      'url': 'https://www.ochijewelry.com/',
      'telephone': '+15025392085',
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '2800 Hikes Ln',
        'addressLocality': 'Louisville',
        'addressRegion': 'KY',
        'postalCode': '40218',
        'addressCountry': 'US'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 38.2045,
        'longitude': -85.6728
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '09:00',
          'closes': '19:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': 'Sunday',
          'opens': '11:00',
          'closes': '16:00'
        }
      ],
      'sameAs': [
        'https://www.instagram.com/ochijewelry',
        'https://www.facebook.com/ochijewelry',
        'https://wa.me/13055550190'
      ]
    });
  }
}
