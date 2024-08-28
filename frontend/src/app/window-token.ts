import { InjectionToken, FactoryProvider, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const WINDOW = new InjectionToken<Window>('window');

const windowFactory = (platformId: Object): Window | Object => {
  if (isPlatformBrowser(platformId)) {
    return window;
  } else {
    return {};
  }
};

const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [PLATFORM_ID]
};

export const WINDOW_PROVIDERS = [
  windowProvider
];
