import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);
  private translate = inject(TranslateService);

  /**
   * Set dynamic SEO tags for the current page.
   * Listens to language changes to keep metadata translated in real-time.
   */
  setTags(config: {
    titleKey: string;
    descriptionKey: string;
    keywordsKey?: string;
    image?: string;
  }) {
    // Listen to translation changes
    const keys = [config.titleKey, config.descriptionKey];
    if (config.keywordsKey) {
      keys.push(config.keywordsKey);
    }

    this.translate.get(keys).subscribe((res) => {
      const titleVal = res[config.titleKey];
      const descVal = res[config.descriptionKey];
      const keywordsVal = config.keywordsKey ? res[config.keywordsKey] : '';

      const fullTitle = `${titleVal} | Ochi Jewelry`;

      // Update basic tags
      this.title.setTitle(fullTitle);
      this.meta.updateTag({ name: 'description', content: descVal });
      
      if (keywordsVal) {
        this.meta.updateTag({ name: 'keywords', content: keywordsVal });
      }

      // Update Open Graph (Social Sharing)
      this.meta.updateTag({ property: 'og:title', content: fullTitle });
      this.meta.updateTag({ property: 'og:description', content: descVal });
      this.meta.updateTag({ property: 'og:url', content: this.doc.URL });
      if (config.image) {
        this.meta.updateTag({ property: 'og:image', content: config.image });
      }

      // Update Twitter Cards
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
      this.meta.updateTag({ name: 'twitter:description', content: descVal });
      if (config.image) {
        this.meta.updateTag({ name: 'twitter:image', content: config.image });
      }
    });

    this.updateCanonicalUrl();
  }

  /**
   * Insert dynamic Canonical URLs
   */
  private updateCanonicalUrl() {
    let link: HTMLLinkElement | null = this.doc.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    // Remove query params like ?lang=es for clean canonical index
    const url = new URL(this.doc.URL);
    link.setAttribute('href', `${url.origin}${url.pathname}`);
  }

  /**
   * Injects structured JSON-LD Schema.org script into document head.
   */
  setSchema(schema: object) {
    // Clean up existing dynamic schemas
    const existing = this.doc.querySelectorAll('script[id="seo-jsonld-schema"]');
    existing.forEach((el) => el.remove());

    const script = this.doc.createElement('script');
    script.setAttribute('id', 'seo-jsonld-schema');
    script.setAttribute('type', 'application/ld+json');
    script.text = JSON.stringify(schema);
    this.doc.head.appendChild(script);
  }
}
