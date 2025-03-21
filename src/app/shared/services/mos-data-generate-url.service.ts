import { Injectable } from '@angular/core';
import { SearchQueryFilter } from '../filters/search-query-filter.viewmodel';
import { environment } from '../../environments/environment';
import { MosDataVersionService } from './mos-data-version.service';

@Injectable({
  providedIn: 'root',
})
export class MosDataGenerateUrlService {
  private apiUrl = environment.apiUrlPrefix;
  private apiKey = environment.apiKey;
  private datasetId = environment.datasetId;

  constructor(private mosDataVersionService: MosDataVersionService) {}

  generateApiFullUrl(query: SearchQueryFilter): string {
    console.log('URL gen:', query);
    const params: string[] = [];

    const apiVersion = this.mosDataVersionService.getApiVersion();
    if (!apiVersion) {
      throw new Error('API version is not loaded');
    }

    if (query.search) {
      params.push(`q=${encodeURIComponent(query.search)}`);
    }
    if (query.skip !== undefined) {
      params.push(`$skip=${query.skip}`);
    }
    if (query.top !== undefined) {
      params.push(`$top=${query.top}`);
    }
    if (query.inlinecount) {
      params.push(`$inlinecount=${query.inlinecount}`);
    }
    if (query.orderby) {
      params.push(`$orderby=${encodeURIComponent(query.orderby)}`);
    }
    if (query.filter) {
      params.push(`$filter=${encodeURIComponent(query.filter)}`);
    }
    if (query.foreign) {
      params.push(`foreign=${query.foreign}`);
    }

    params.push(`api_key=${this.apiKey}`);

    return `${this.apiUrl}/v${apiVersion}/datasets/${
      this.datasetId
    }/rows/?${params.join('&')}`;
  }
}
