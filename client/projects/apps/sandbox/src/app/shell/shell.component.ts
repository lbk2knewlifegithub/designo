import { Component, OnInit } from "@angular/core";
import { Link } from "@lbk/shared/models";

@Component({
  selector: "lbk-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"]
})
export class ShellComponent {
  links: Link[] = [
    {
      href: "dropdowns",
      title: "Dropdowns"
    },
    {
      href: "buttons",
      title: "Buttons"
    },
    {
      href: "loadings",
      title: "Loadings"
    },
    {
      href: "forms",
      title: "Forms"
    },
    {
      href: "searches",
      title: "Searches"
    },
    {
      href: "inputs",
      title: "Input"
    },
    {
      href: "menus",
      title: "Menus"
    },
    {
      href: "sliders",
      title: "Sliders"
    },
    {
      href: "page-not-founds",
      title: "Page Not Founds"
    },
    {
      href: "tabs",
      title: "Tabs"
    },
    {
      href: "checkboxes",
      title: "Checkboxes"
    },
    {
      href: "radios",
      title: "Radios"
    },
    {
      href: "carousels",
      title: "Carousels"
    },
    {
      href: "switches",
      title: "Switches"
    },
    {
      href: "others",
      title: "Others"
    }
  ];

  currentLink: Link = this.links[5];

  constructor() {
  }


}
