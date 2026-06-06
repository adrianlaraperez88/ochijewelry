# OchiJewelry

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.8.

---

## 🚀 Quick Start & Scripts

### Development Server
To start a local development server, run:
```bash
ng serve
```
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code Scaffolding
Angular CLI includes powerful code scaffolding tools. To generate a new component, run:
```bash
ng generate component component-name
```
For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:
```bash
ng generate --help
```

### Building
To build the project run:
```bash
ng build
```
This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running Unit Tests
To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:
```bash
ng test
```

### Running End-to-End Tests
For end-to-end (e2e) testing, run:
```bash
ng e2e
```

---

## 🛠️ Developer Guide: Adding a New Section

To add a new section to a page (e.g., the Home page), follow these steps:

### 1. Create the Section Component (Optional)
If your section is complex, contains interactive logic, or is reusable, generate a new component:
```bash
ng generate component shared/my-new-section --skip-tests
```
*(Alternatively, you can write the template directly inside the page's HTML file).*

### 2. Import the Component
If you created a new standalone component, import it into the page component where it will be displayed:
For example, in `src/app/pages/home/home.ts`:
```typescript
import { MyNewSectionComponent } from '../../shared/my-new-section/my-new-section';

@Component({
  // ...
  imports: [RouterLink, TranslateModule, MyNewSectionComponent], // Add here
})
export class HomeComponent { ... }
```

### 3. Add to the Template
Add the component markup or section HTML to the template file (e.g., `src/app/pages/home/home.html`):
```html
<!-- ─── MY NEW SECTION ────────────────────────────────────────────────────── -->
<section class="my-new-section section">
  <div class="container">
    <h2>My New Section Title</h2>
    <p>This is a new section on Ochi Jewelry.</p>
  </div>
</section>
```

---

## ⚙️ Developer Guide: Managing Feature Flags

This project uses a feature flagging system to conditionally show or hide sections, pages, or options. This allows us to work on new features without displaying them in production until they are ready.

### 1. Define the Flag Key and Type
Open [feature-flag.service.ts](file:///f:/ai-projects/ochijewelry/ochi-jewelry/src/app/core/services/feature-flag.service.ts) and add your new flag key to the `FeatureFlags` interface:

```typescript
export interface FeatureFlags {
  showCollections: boolean;
  showPromo: boolean;
  showHighlights: boolean;
  showFeaturedGrid: boolean;
  showServicesTeaserOnHome: boolean;
  showAboutStats: boolean;
  showMyNewSection: boolean; // Add your new flag here
}
```

### 2. Set the Default Value
In the same [feature-flag.service.ts](file:///f:/ai-projects/ochijewelry/ochi-jewelry/src/app/core/services/feature-flag.service.ts) file, specify the default state in the `DEFAULT_FLAGS` constant:

```typescript
const DEFAULT_FLAGS: FeatureFlags = {
  showCollections: false,
  showPromo: true,
  showHighlights: true,
  showFeaturedGrid: false,
  showServicesTeaserOnHome: true,
  showAboutStats: true,
  showMyNewSection: false, // Default is set to false (hidden)
};
```

### 3. Inject the Feature Flag Service
To use feature flags in your component, inject the `FeatureFlagService` in the component class:

```typescript
import { Component, inject } from '@angular/core';
import { FeatureFlagService } from '../../core/services/feature-flag.service';

@Component({
  // ...
  templateUrl: './home.html',
})
export class HomeComponent {
  ff = inject(FeatureFlagService); // Inject service
}
```

### 4. Conditionally Render in the Template
Wrap your section or component with an `@if` block checking your flag via `ff.isEnabled('flagName')`:

```html
<!-- ─── MY NEW SECTION (feature flagged) ─────────────────────────────────── -->
@if (ff.isEnabled('showMyNewSection')) {
  <section class="my-new-section section">
    <div class="container">
      <h2>My New Section Title</h2>
      <p>This is a feature-flagged section.</p>
    </div>
  </section>
}
```

---

## 🧪 Testing Feature Flags Locally

You do not need to change the default values in code to test flags locally. The feature flag service stores overrides in `localStorage`. You can toggle flags directly in your browser's Developer Tools Console.

### View Current Flags & Local Overrides
Run this command in the browser console to see current active overrides:
```javascript
console.table(JSON.parse(localStorage.getItem('ochi-feature-flags-v2') || '{}'));
```

### Enable or Disable a Flag
Run this snippet to override a flag dynamically:
```javascript
const flags = JSON.parse(localStorage.getItem('ochi-feature-flags-v2') || '{}');
flags.showMyNewSection = true; // Set to true to enable, false to disable
localStorage.setItem('ochi-feature-flags-v2', JSON.stringify(flags));
location.reload(); // Reload the page to apply overrides
```

### Clear All Local Overrides
To revert back to the default values defined in the codebase:
```javascript
localStorage.removeItem('ochi-feature-flags-v2');
location.reload();
```

---

## 📚 Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
