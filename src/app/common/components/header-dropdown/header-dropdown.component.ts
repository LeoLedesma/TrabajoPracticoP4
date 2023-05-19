import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  styles: ["a:hover{cursor: pointer;}"]
})
export class HeaderDropdownComponent {

  showDropdown: boolean = false;
  @Input() title: string = '';
  @Input() icono: string = '';
  swap()
  {
    this.showDropdown = !this.showDropdown;
  }  

}
