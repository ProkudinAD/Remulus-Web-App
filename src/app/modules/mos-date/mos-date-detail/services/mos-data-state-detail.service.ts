import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MosDataStateService {
  private selectedRowSubject = new BehaviorSubject<any>(null);
  selectedRow$ = this.selectedRowSubject.asObservable();

  setSelectedRow(row: any): void {
    this.selectedRowSubject.next(row);
  }

  getSelectedRow(): any {
    return this.selectedRowSubject.value;
  }
}