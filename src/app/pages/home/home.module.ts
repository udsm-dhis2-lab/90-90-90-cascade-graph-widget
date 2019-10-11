import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { pages } from './pages';
import { VisualizationComponent } from './component/visualization/visualization.component';

@NgModule({
  declarations: [...pages, VisualizationComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
