import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MosDataVersionService {
  private apiUrl = environment.apiUrlPrefix;
  private apiKey = environment.apiKey;

  private apiVersionSubject = new ReplaySubject<string>(1);
  apiVersion$ = this.apiVersionSubject.asObservable();

  private apiVersion: string | null = null;

  constructor(private http: HttpClient) {}

  async loadApiVersion(): Promise<void> {
    try {
      const versionResponse = await firstValueFrom(
        this.http.get<ApiVersionModel>(
          `${this.apiUrl}/version?api_key=${this.apiKey}`
        )
      );
      this.apiVersion = versionResponse.Version.toString();
      this.apiVersionSubject.next(this.apiVersion);
    } catch (error) {
      console.error('Ошибка загрузки версии API', error);
    }
  }

  getApiVersion(): string | null {
    return this.apiVersion;
  }
}

interface ApiVersionModel {
  Version: number;
}
