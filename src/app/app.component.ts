import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MosDataVersionService } from './shared/services/mos-data-version.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private mosDataVersionConfig: MosDataVersionService) {}

  async ngOnInit() {
    await this.mosDataVersionConfig.loadApiVersion();
  }
}
