import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeAtividadesAlunosComponent } from './lista-de-atividades-alunos.component';

describe('ListaDeAtividadesAlunosComponent', () => {
  let component: ListaDeAtividadesAlunosComponent;
  let fixture: ComponentFixture<ListaDeAtividadesAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeAtividadesAlunosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeAtividadesAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
