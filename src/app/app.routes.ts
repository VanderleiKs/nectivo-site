import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './pages/contact';
import { Examples } from './pages/examples';
import { Faq } from './pages/faq';
import { How } from './pages/how';
import { Solution } from './solution/solution';

export const routes: Routes = [
  { path: '', component: Home, title: 'Nectivo — Sua presença digital, sem complicação' },
  { path: 'landing-page', component: Solution, data: { slug: 'landing-page' }, title: 'Landing page — Nectivo' },
  { path: 'site-institucional', component: Solution, data: { slug: 'site-institucional' }, title: 'Site institucional — Nectivo' },
  { path: 'como-funciona', component: How, title: 'Como funciona — Nectivo' },
  { path: 'exemplos', component: Examples, title: 'Exemplos — Nectivo' },
  { path: 'duvidas', component: Faq, title: 'Dúvidas frequentes — Nectivo' },
  { path: 'contato', component: Contact, title: 'Contato — Nectivo' },
  { path: '**', redirectTo: '' },
];
