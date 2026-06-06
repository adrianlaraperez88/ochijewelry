import { Injectable, signal } from '@angular/core';

export interface FeatureFlags {
  showCollections: boolean;
  showPromo: boolean;
  showHighlights: boolean;
  showFeaturedGrid: boolean;
  showServicesTeaserOnHome: boolean;
  showAboutStats: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  showCollections: false,      // No products yet — disable collections grid
  showPromo: true,             // Sale/promotions section enabled
  showHighlights: true,        // Why Ochi? cards
  showFeaturedGrid: false,     // Featured products grid on home (disabled by default since there are no products yet)
  showServicesTeaserOnHome: true, // Services teaser on home page
  showAboutStats: true,        // Stats in about page
};

const STORAGE_KEY = 'ochi-feature-flags-v2';

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  private flags = signal<FeatureFlags>(this.loadFlags());

  private loadFlags(): FeatureFlags {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_FLAGS, ...JSON.parse(saved) } : { ...DEFAULT_FLAGS };
    } catch {
      return { ...DEFAULT_FLAGS };
    }
  }

  get(key: keyof FeatureFlags): boolean {
    return this.flags()[key];
  }

  isEnabled(key: keyof FeatureFlags): boolean {
    return this.flags()[key];
  }

  toggle(key: keyof FeatureFlags): void {
    const updated = { ...this.flags(), [key]: !this.flags()[key] };
    this.flags.set(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  set(key: keyof FeatureFlags, value: boolean): void {
    const updated = { ...this.flags(), [key]: value };
    this.flags.set(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  getAll(): FeatureFlags {
    return this.flags();
  }
}
