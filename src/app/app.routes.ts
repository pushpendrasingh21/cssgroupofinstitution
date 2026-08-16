import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { CoursesComponent } from './pages/courses.component';
import { AboutComponent } from './pages/about.component';
import { AdmissionsComponent } from './pages/admissions.component';
import { EnquiryComponent } from './pages/enquiry.component';
import { ContactComponent } from './pages/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admissions', component: AdmissionsComponent },
  { path: 'enquiry', component: EnquiryComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
