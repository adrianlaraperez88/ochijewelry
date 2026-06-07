import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
  private translate = inject(TranslateService);

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
      image: 'https://www.ochijewelry.com/assets/images/hero.webp'
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
        '@type': 'JewelryStore',
        'name': 'Ochi Jewelry',
        'image': 'https://www.ochijewelry.com/assets/images/hero.webp',
        'logo': 'https://www.ochijewelry.com/assets/images/logo.webp',
        '@id': 'https://www.ochijewelry.com/#store',
        'url': 'https://www.ochijewelry.com/',
        'telephone': phoneVal,
        'email': emailVal,
        'priceRange': '$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': street,
          'addressLocality': city,
          'addressRegion': state,
          'postalCode': zip,
          'addressCountry': 'US'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 38.2045,
          'longitude': -85.6728
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '128'
        },
        'review': [
          {
            '@type': 'Review',
            'author': {
              '@type': 'Person',
              'name': 'Sophia Rodriguez'
            },
            'reviewRating': {
              '@type': 'Rating',
              'ratingValue': '5'
            },
            'reviewBody': 'La mejor joyería de la zona. Ajustaron mi anillo de compromiso en menos de una hora. El trabajo fue impecable y el trato muy profesional.'
          },
          {
            '@type': 'Review',
            'author': {
              '@type': 'Person',
              'name': 'Alexander Silva'
            },
            'reviewRating': {
              '@type': 'Rating',
              'ratingValue': '5'
            },
            'reviewBody': 'Encargué una cadena de oro personalizada y superó todas mis expectativas. La atención al detalle en el taller es realmente excepcional.'
          }
        ],
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'opens': '09:00',
            'closes': '19:00'
          }
        ],
        'sameAs': [
          'https://www.instagram.com/ochijewelry',
          'https://www.facebook.com/ochijewelry',
          'https://wa.me/15029562317'
        ]
      });
    });
  }
}
