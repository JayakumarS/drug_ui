import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatTabsModule } from "@angular/material/tabs";
import { MatmenuComponent } from './matmenu/matmenu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatdynamicsubmenuComponent } from "./matdynamicmenu/matdynamicsubmenu/matdynamicsubmenu.component";
@NgModule({
  imports: [CommonModule, NgbModule, MatTabsModule, MatMenuModule],
  declarations: [
    MatdynamicsubmenuComponent
  ],
})
export class LayoutModule {}
