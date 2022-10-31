import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnfantComponent } from './list-enfant.component';

describe('ListEnfantComponent', () => {
  let component: ListEnfantComponent;
  let fixture: ComponentFixture<ListEnfantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEnfantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
