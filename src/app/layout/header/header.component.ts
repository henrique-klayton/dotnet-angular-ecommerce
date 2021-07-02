import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('nome') name: string;
  @Output() out = new EventEmitter<{upperCaseName: string}>();
  constructor() { }

  ngOnInit(): void {
  }

  public upperCase = () => this.out.emit({upperCaseName: this.name.toUpperCase()});

}
