import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { BehaviorSubject, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchQueryFilter } from '../../../../shared/filters/search-query-filter.viewmodel';
import { Router } from '@angular/router';
import { HighlightPipe } from "../../../../shared/pipes/highlight.pipe";
import { MosDataStateService } from '../../mos-date-detail/services/mos-data-state-detail.service';
import { MosDataService } from '../services/mos-data.service';

@Component({
  selector: 'app-mos-data-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, ScrollingModule, HighlightPipe],
  templateUrl: './mos-data-list.component.html',
  styleUrl: './mos-data-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MosDataListComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  displayedColumns: string[] = ['index', 'FullName', 'address'];

  dataSource = new BehaviorSubject<any[]>([]);
  protected totalItemSize = 50;
  private pageSize = 40;
  private currentPage = 0;
  public searchQuery = '';

  constructor(
    public service: MosDataService,
    public stateService: MosDataStateService,
    private router: Router
  ) {}

  public form: FormGroup = new FormGroup({
    search: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  ngOnInit() {}

  async onGoToSearchClick() {
    if (this.form.invalid) {
      alert('Необходимо ввести текст для поиска');
      return;
    }
    this.searchQuery = this.form.get('search')?.value;
    this.currentPage = 0;
    this.dataSource.next([]);
    this.loadData();
  }

  loadData() {
    const query = new SearchQueryFilter({
      search: this.searchQuery,
      skip: this.currentPage * this.pageSize,
      top: this.pageSize,
      inlinecount: 'allpages',
      orderby: 'FullName',
      foreign: 'false',
    });
    this.service
      .getRowList(query)
      .pipe(
        tap((response) => {
          const newData = response.map((item: any) => item.Cells) || [];
          const currentData = this.dataSource.value;
          this.dataSource.next([...currentData, ...newData]);
        })
      )
      .subscribe();
  }

  onScroll() {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) {
      this.currentPage++;
      this.loadData();
    }
  }

  onRowClick(row: any) {
    if (row) {
      this.stateService.setSelectedRow(row);
      this.router.navigate(['/detail', row.global_id]);
    }
  }

  getAddressString(addresses: { Address: string }[]): string {
    return addresses.map((addr) => addr.Address).join('\n');
  }
}
