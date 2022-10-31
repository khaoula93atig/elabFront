import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabarParentComponent } from './nabar-parent.component';

describe('NabarParentComponent', () => {
  let component: NabarParentComponent;
  let fixture: ComponentFixture<NabarParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NabarParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NabarParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
