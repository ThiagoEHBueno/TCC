import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeAtividadesComponent } from './lista-de-atividades.component';

describe('ListaDeAtividadesComponent', () => {
  let component: ListaDeAtividadesComponent;
  let fixture: ComponentFixture<ListaDeAtividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeAtividadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeAtividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
