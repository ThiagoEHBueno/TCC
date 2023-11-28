import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoHomeComponent} from './tela-aluno.component';

describe('AlunoHomeComponent', () => {
  let component: AlunoHomeComponent;
  let fixture: ComponentFixture<AlunoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
