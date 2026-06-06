import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent implements OnInit {
  private seo = inject(SEOService);
  private translate = inject(TranslateService);
  form = { name: '', email: '', message: '' };
  submitted = signal(false);
  sending = signal(false);

  ngOnInit() {
    this.seo.setTags({
      titleKey: 'seo.contact.title',
      descriptionKey: 'seo.contact.desc',
      keywordsKey: 'seo.contact.keywords',
      image: 'https://www.ochijewelry.com/assets/images/logo.webp'
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
        '@type': 'ContactPage',
        'mainEntity': {
          '@type': 'LocalBusiness',
          'name': 'Ochi Jewelry',
          'telephone': phoneVal,
          'email': emailVal,
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': street,
            'addressLocality': city,
            'addressRegion': state,
            'postalCode': zip,
            'addressCountry': 'US'
          }
        }
      });
    });
  }

  onSubmit() {
    this.sending.set(true);
    // Simulate send
    setTimeout(() => {
      this.sending.set(false);
      this.submitted.set(true);
      this.form = { name: '', email: '', message: '' };
      setTimeout(() => this.submitted.set(false), 5000);
    }, 1500);
  }
}
