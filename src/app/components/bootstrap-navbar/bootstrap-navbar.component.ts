import { Component, Input } from '@angular/core';
import { RouterActive } from '../router-active';
import { Link } from "./Link";

@Component({
  selector: 'bootstrap-navbar',
  directives: [RouterActive],
  styles: [require('./bootstrap-navbar.css')],
  template: require('./bootstrap-navbar.html')
})
export class BootstrapNavbarComponent {
  @Input() brand: Link;
  @Input() leftLinks: Link[];
  @Input() rightLinks: Link[];
}
