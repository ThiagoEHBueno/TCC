import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaProfessorComponent } from './tela-professor.component';

describe('TelaProfessorComponent', () => {
  let component: TelaProfessorComponent;
  let fixture: ComponentFixture<TelaProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaProfessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
