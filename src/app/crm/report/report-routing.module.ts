import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { Role } from 'src/app/core/models/role';
const routes: Routes = [
  {
    path: "controlledSubstance",
    canActivate: [AuthGuard],
    data: {
      role: Role.Admin,
    },
    loadChildren: () =>
      import("./controlled-substance/controlled-substance-routing.module").then((m) => m.ControlledSubstanceRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
