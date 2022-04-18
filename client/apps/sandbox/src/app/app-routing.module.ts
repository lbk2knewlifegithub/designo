import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShellComponent } from "./shell/shell.component";

const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      {
        path: "dropdowns",
        loadChildren: () => import("./shell/dropdowns/dropdowns.module").then(m => m.DropdownsModule)
      },
      {
        path: "buttons",
        loadChildren: () => import("./shell/buttons/buttons.module").then(m => m.ButtonsModule)
      },
      {
        path: "loadings",
        loadChildren: () => import("./shell/loadings/loadings.module").then(m => m.LoadingsModule)
      },
      {
        path: "forms",
        loadChildren: () => import("./shell/forms/forms.module").then(m => m.FormsModule)
      },
      {
        path: "searches",
        loadChildren: () => import("./shell/search-bars/search-bars.module").then(m => m.SearchBarsModule)
      },
      {
        path: "inputs",
        loadChildren: () => import("./shell/inputs/inputs.module").then(m => m.InputsModule)
      },
      {
        path: "menus",
        loadChildren: () => import("./shell/menus/menus.module").then(m => m.MenusModule)
      },
      {
        path: "sliders",
        loadChildren: () => import("./shell/sliders/sliders.module").then(m => m.SlidersModule)
      },
      {
        path: "tabs",
        loadChildren: () => import("./shell/tabs/tabs.module").then(m => m.TabsModule)
      },
      {
        path: "checkboxes",
        loadChildren: () => import("./shell/checkboxes/checkboxes.module").then(m => m.CheckboxesModule)
      },
      {
        path: "radios",
        loadChildren: () => import("./shell/radios/radios.module").then(m => m.RadiosModule)
      },
      {
        path: "switches",
        loadChildren: () => import("./shell/switches/switches.module").then(m => m.SwitchesModule)
      },
      {
        path: "carousels",
        loadChildren: () => import("./shell/carousels/carousels.module").then(m => m.CarouselsModule)
      },
      {
        path: "page-not-founds",
        loadChildren: () => import("./shell/page-not-founds/page-not-founds.module").then(m => m.PageNotFoundsModule)
      },
      {
        path: "others",
        loadChildren: () => import("./shell/others/others.module").then(m => m.OthersModule)
      },
      {
        path: "",
        redirectTo: "buttons",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "astronaut",
    loadChildren: () => import("@lbk/shared/components/page-not-founds").then(m => m.AstronautPageNotFoundModule)
  },
  {
    path: "**",
    redirectTo: "astronaut",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
