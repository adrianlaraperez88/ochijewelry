import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
  form = { name: '', email: '', message: '' };
  submitted = signal(false);
  sending = signal(false);

  ngOnInit() {
    this.seo.setTags({
      titleKey: 'seo.contact.title',
      descriptionKey: 'seo.contact.desc',
      keywordsKey: 'seo.contact.keywords',
      image: 'https://www.ochijewelry.com/assets/images/logo.png'
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
