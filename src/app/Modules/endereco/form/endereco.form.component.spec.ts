import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Endereco.FormComponent } from './endereco.form.component';

describe('Endereco.FormComponent', () => {
  let component: Endereco.FormComponent;
  let fixture: ComponentFixture<Endereco.FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Endereco.FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Endereco.FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
