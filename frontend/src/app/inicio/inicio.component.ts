import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  showSubMenu: boolean = false;

  toggleSubMenu() {
    this.showSubMenu = !this.showSubMenu;
  }

  selectedUserType: string = ''; // Variable para almacenar el tipo de usuario seleccionado

  selectUserType(userType: string) {
    this.selectedUserType = userType;
  }


}
