import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ferramentaComponent } from './ferramenta.component';

describe('ferramentaComponent', () => {
  let component: ferramentaComponent;
  let fixture: ComponentFixture<ferramentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ferramentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ferramentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
