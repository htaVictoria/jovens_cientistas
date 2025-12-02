import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions  } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes, withInMemoryScrolling({
        scrollPositionRestoration: 'top', anchorScrolling: 'enabled'}),
     ), 
     provideClientHydration(withEventReplay()), 
     provideAnimations(),
     providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'none' 
        }
      }
    })
    ]
};
