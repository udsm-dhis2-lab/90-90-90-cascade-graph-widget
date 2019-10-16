import { Component, OnInit, Input } from '@angular/core';
import { ErrorMessage } from 'src/app/core/models/error-message.model';

@Component({
  selector: 'app-visualization-error',
  templateUrl: './visualization-error.component.html',
  styleUrls: ['./visualization-error.component.css'],
})
export class VisualizationErrorComponent implements OnInit {
  @Input() errorMessage: ErrorMessage;
  message: string;

  constructor() {}

  ngOnInit() {
    if (this.errorMessage) {
      this.message = `Error while accessing cascade visualization. Please make sure your internet connectivity is configured correctly or if you have access to this visualization`;
    }
  }
}
