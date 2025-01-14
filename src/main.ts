import { bootstrapApplication } from '@angular/platform-browser';
import { FormComponent } from './app/form/form.component';

bootstrapApplication(FormComponent)
  .catch((err) => console.error(err));
