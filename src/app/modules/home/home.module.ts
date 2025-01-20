import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeRouterConstants } from "../../constants/routers/home/home-router-constants";

@NgModule({
    imports: [
      RouterModule.forChild([
        {
            path: HomeRouterConstants.HOME_PAGE_ROUTER,
            loadChildren: () => import("./home-page/home-page.module").then((m) => m.HomeModule)
        },
        {
            path: "",
            redirectTo: HomeRouterConstants.HOME_PAGE_ROUTER,
            pathMatch: "full"
         }
      ])
    ]
  })
export class HomeModule { }