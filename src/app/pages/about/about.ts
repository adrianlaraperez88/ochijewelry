import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule, NgOptimizedImage],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent implements OnInit {
  private seo = inject(SEOService);
  private translate = inject(TranslateService);

  stats = [
    { key: 'stat1' },
    { key: 'stat2' },
    { key: 'stat3' },
  ];

  values = [
    { icon: '💎', title: 'Quality', desc: 'We source only the finest materials — certified gold, genuine gemstones, and premium silver.' },
    { icon: '🤝', title: 'Trust', desc: 'Every piece entrusted to us is treated with the utmost care and respect.' },
    { icon: '⚡', title: 'Speed', desc: 'We know your time is precious. Most services are completed same-day.' },
    { icon: '❤️', title: 'Passion', desc: 'Jewelry is our art. We bring love and precision to every single piece.' },
  ];

  ngOnInit() {
    this.seo.setTags({
      titleKey: 'seo.about.title',
      descriptionKey: 'seo.about.desc',
      keywordsKey: 'seo.about.keywords',
      image: 'https://www.ochijewelry.com/assets/images/store.webp'
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
        '@type': 'AboutPage',
        'mainEntity': {
          '@type': 'LocalBusiness',
          'name': 'Ochi Jewelry',
          'image': 'https://www.ochijewelry.com/assets/images/store.webp',
          'foundingDate': '2010',
          'telephone': phoneVal,
          'email': emailVal,
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': street,
            'addressLocality': city,
            'addressRegion': state,
            'postalCode': zip,
            'addressCountry': 'US'
          },
          'knowsAbout': [
            'Jewelry Repair',
            'Ring Resizing',
            'Custom Jewelry Design',
            'Gold Plating',
            'Stone Setting',
            'Laser Soldering'
          ]
        }
      });
    });
  }
}
