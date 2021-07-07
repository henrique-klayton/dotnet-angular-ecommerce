import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public navList: { route: string, icon: string, label: string }[] = [
    {
      route: "",
      icon: "home",
      label: "Home"
    },
    {
      route: "usuarios",
      icon: "person",
      label: "Usuário"
    },
    {
      route: "",
      icon: "place",
      label: "Endereço"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
