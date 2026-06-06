import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [TranslateModule, RouterLink, NgOptimizedImage],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent implements OnInit {
  private seo = inject(SEOService);
  private translate = inject(TranslateService);

  services = [
    { key: 'repair',      icon: '🔧', highlight: true  },
    { key: 'resize',      icon: '💍', highlight: true  },
    { key: 'solder',      icon: '🔥', highlight: false },
    { key: 'restore',     icon: '✨', highlight: true  },
    { key: 'plating',     icon: '🥇', highlight: true  },
    { key: 'stone',       icon: '💎', highlight: false },
    { key: 'maintenance', icon: '🌟', highlight: false },
    { key: 'general',     icon: '⚙️', highlight: false },
  ];

  processSteps = ['step1', 'step2', 'step3', 'step4'];
  whyItems = ['experience', 'fast', 'price', 'quality'];

  whyIcons: Record<string, string> = {
    experience: '🏆',
    fast: '⚡',
    price: '💰',
    quality: '✅',
  };

  ngOnInit() {
    this.seo.setTags({
      titleKey: 'seo.services.title',
      descriptionKey: 'seo.services.desc',
      keywordsKey: 'seo.services.keywords',
      image: 'https://www.ochijewelry.com/assets/images/services-hero.webp'
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
        '@type': 'Service',
        'serviceType': 'Jewelry Repair & Custom Design Services',
        'provider': {
          '@type': 'JewelryStore',
          'name': 'Ochi Jewelry',
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
          }
        },
        'areaServed': {
          '@type': 'AdministrativeArea',
          'name': 'Louisville, KY'
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Jewelry Services Catalog',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Same-Day Jewelry Repair',
                'description': 'Quick turnaround on most jewelry repairs, done while you wait.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Ring Resizing',
                'description': 'Sizing rings up or down with precision for a perfect fit.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Gold Plating Bath',
                'description': 'Refresh and protect your jewelry with premium gold plating.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Jewelry Restoration',
                'description': 'Breathe new life into heirloom pieces with our complete restoration service.'
              }
            }
          ]
        }
      });
    });
  }
}
