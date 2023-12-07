import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeFerramentasComponent } from './lista-de-ferramentas.component';

describe('ListaDeFerramentasComponent', () => {
  let component: ListaDeFerramentasComponent;
  let fixture: ComponentFixture<ListaDeFerramentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeFerramentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeFerramentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
