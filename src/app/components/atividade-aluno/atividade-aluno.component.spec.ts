import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeAlunoComponent } from './atividade-aluno.component';

describe('AtividadeAlunoComponent', () => {
  let component: AtividadeAlunoComponent;
  let fixture: ComponentFixture<AtividadeAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeAlunoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtividadeAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
