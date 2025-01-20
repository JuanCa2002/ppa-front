import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page.component";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-page.routing.module";
import { SharedModule } from "../../shared/shared.module";
import { HomePagePanelComponent } from "./components/home-page-panel/home-page-panel.component";

@NgModule({
    declarations: [
      HomePageComponent,
      HomePagePanelComponent
    ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      SharedModule
    ]
  })
  export class HomeModule { }