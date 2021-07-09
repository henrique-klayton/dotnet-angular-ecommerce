import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormValidationService } from 'src/app/shared/service/form.service';
import { AddressModel } from '../model/address.model';
import { STATES } from 'src/app/util/constants';
import { AddressService } from '../service/address.service';
import { debounceTime, delay, retry, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddressFormModel } from './model/address.form.model';

@Component({
  selector: 'app-endereco.form',
  templateUrl: './endereco.form.component.html',
  styleUrls: ['./endereco.form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnderecoFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public states = STATES;

  private _onDestroy = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _addressService: AddressService,
    public _snackBar: MatSnackBar,
    public _formValidation: FormValidationService,
    public dialogRef: MatDialogRef<EnderecoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: {id: string, table: AddressFormModel[]}
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group(new AddressModel());
    this.subscribeCep();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private subscribeCep() {
    this.form
      .get('cep')
      .valueChanges.pipe(debounceTime(1000), takeUntil(this._onDestroy))
      .subscribe((v: string) => {
        if (v.length == 8) {
          this._addressService.fetchCep(v).then(res => this.form.patchValue(res));
        }
      });
  }

  public saveAddress() {
    const cep = this.form.get("cep").value;
    const address = this.data.table.find(endereco => endereco.cep === cep);
    if (address) {
      this._snackBar.open(`CEP ${cep} já cadastrado!`, "Fechar");
      return;
    }
    this._addressService.insertOrUpdateAddress(this.form.value)
    .then(() => this._snackBar.open("CEP cadastrado com sucesso!", "Fechar"))
    .catch(() => this._snackBar.open("Erro ao cadastrar o CEP!", "Fechar"));
    this.dialogRef.close('closed');
  }
}
