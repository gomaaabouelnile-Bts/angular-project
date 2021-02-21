
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
// tslint:disable-next-line: only-arrow-functions
$('#myModal').on('shown.bs.modal', function() {
    $('#myInput').trigger('focus');
  });
