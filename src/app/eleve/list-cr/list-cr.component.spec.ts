import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCRComponent } from './list-cr.component';

describe('ListCRComponent', () => {
  let component: ListCRComponent;
  let fixture: ComponentFixture<ListCRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
