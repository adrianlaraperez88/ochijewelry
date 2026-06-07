import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FeatureFlagService } from '../../core/services/feature-flag.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslateModule, NgOptimizedImage],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  ff = inject(FeatureFlagService);
  private translate = inject(TranslateService);
  currentYear = new Date().getFullYear();

  currentLang() {
    return this.translate.currentLang || this.translate.defaultLang;
  }
}
