import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EnderecoModel } from './model/endereco.model';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {
  public displayedColumns: string[] = [
    "cep",
    "logradouro",
    "bairro",
    "localidade",
    "uf",
    "ibge",
  ];
  public dataSource: MatTableDataSource<EnderecoModel>;

  constructor() { }

  ngOnInit(): void {
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
