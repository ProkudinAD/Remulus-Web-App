import { Routes } from '@angular/router';
import { MosDataDetailComponent } from './modules/mos-date/mos-date-detail/components/mos-data-detail.component';
import { MosDataListComponent } from './modules/mos-date/mos-date-list/components/mos-data-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MosDataListComponent,
  },
  {
    path: 'detail/:id',
    component: MosDataDetailComponent,
  },
];
