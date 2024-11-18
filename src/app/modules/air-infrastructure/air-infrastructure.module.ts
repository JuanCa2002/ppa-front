import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AirInfrastructureRouterConstants } from '../../constants/routers/air-infrastructure/air-infrastructure-router-constants';


@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path:
              AirInfrastructureRouterConstants.AIRLINE_ROUTER,
            loadChildren: () =>
              import(
                "./airlines-management/airlines-management.module"
              ).then((m) => m.AirlinesManagementModule),
        }
    ]),
  ]
})
export class AirInfrastructureModule { }
