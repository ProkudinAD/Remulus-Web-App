import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MosDataStateService } from '../services/mos-data-state-detail.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mos-data-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './mos-data-detail.component.html',
  styleUrls: ['./mos-data-detail.component.scss'],
})
export class MosDataDetailComponent implements OnInit {
  rowData: any;
  constructor(public stateService: MosDataStateService) {}

  public form: FormGroup = new FormGroup({
    fullName: new FormControl(null),
    chiefName: new FormControl(null),
    address: new FormControl(null),
    phone: new FormControl(null),
    workingHours: new FormControl(null),
  });

  ngOnInit(): void {
    this.form.disable();
    this.stateService.selectedRow$.subscribe((row) => {
      this.rowData = row;
      if (!this.rowData) {
        console.error('Данные строки не найдены!');
      } else {
        this.patchForm();
      }
    });
  }

  patchForm() {
    this.form.patchValue({
      fullName: this.rowData.FullName,
      chiefName: this.rowData.ChiefName,
      phone: this.phoneFormatter(this.rowData.PublicPhone),
      workingHours: this.workingHoursFormatter(this.rowData.WorkingHours),
      address: this.addressFormatter(this.rowData.ObjectAddress)
    });
  }

  private workingHoursFormatter(items: any[]) {
    return this.rowData.WorkingHours.filter(
      (item: any) => item.is_deleted === 0
    )
      .map((item: any) => `${item.DayWeek}: ${item.WorkHours}`)
      .join('\n');
  }

  get workingHoursCount(): number {
    return (
      this.rowData?.WorkingHours?.filter((item: any) => item.is_deleted === 0)
        .length || 1
    );
  }

  private phoneFormatter(tems: any[]) {
    return this.rowData.PublicPhone.filter(
      (item: any) => item.is_deleted === 0
    )
      .map((item: any) => `${item.PublicPhone}`)
      .join('\n');
  }

  get phoneCount(): number {
    return (
      this.rowData?.PublicPhone?.filter((item: any) => item.is_deleted === 0)
        .length || 1
    );
  }

  private addressFormatter(tems: any[]) {
    return this.rowData.ObjectAddress.filter(
      (item: any) => item.is_deleted === 0
    )
      .map((item: any) => `${item.Address}`)
      .join('\n');
  }

  get addressCount(): number {
    return (
      this.rowData?.ObjectAddress?.filter((item: any) => item.is_deleted === 0)
        .length || 1
    );
  }
}
