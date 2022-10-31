import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutParentComponent } from './ajout-parent.component';

describe('AjoutParentComponent', () => {
  let component: AjoutParentComponent;
  let fixture: ComponentFixture<AjoutParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
