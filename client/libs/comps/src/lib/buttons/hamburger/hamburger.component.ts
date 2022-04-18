import { Component, Input } from "@angular/core";

@Component({
  selector: "lbk-hamburger",
  templateUrl: "./hamburger.component.html",
  styleUrls: ["./hamburger.component.scss"]
})
export class HamburgerComponent {
  @Input() isActive = false;
  @Input() color = "black";
}
