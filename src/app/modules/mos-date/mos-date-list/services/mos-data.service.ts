import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SearchQueryFilter } from '../../../../shared/filters/search-query-filter.viewmodel';
import { MosDataGenerateUrlService } from '../../../../shared/services/mos-data-generate-url.service';

@Injectable({
  providedIn: 'root',
})
export class MosDataService {
  constructor(
    private http: HttpClient,
    private mosDataGenerateUrlService: MosDataGenerateUrlService
  ) {}

  getRowList(query: SearchQueryFilter): Observable<any> {
    const url = this.mosDataGenerateUrlService.generateApiFullUrl(query);
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Ошибка при загрузке данных:', error);
        return throwError(() => error);
      })
    );
  }
}
