import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
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
      image: 'https://www.ochijewelry.com/assets/images/store.png'
    });
  }
}
