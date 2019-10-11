import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  renderId: string;
  chartHeight: string;

  constructor() { }

  ngOnInit() {
    this.renderId = 'cainamist';
    this.chartHeight = '600px';
  }

}
