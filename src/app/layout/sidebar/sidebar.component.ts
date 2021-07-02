import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public navList: { route: string, icon: string, label: string }[] = [
    {
      route: "home",
      icon: "home",
      label: "Home"
    },
    {
      route: "user",
      icon: "person",
      label: "Usuário"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
