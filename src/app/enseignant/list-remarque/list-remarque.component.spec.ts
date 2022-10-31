import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRemarqueComponent } from './list-remarque.component';

describe('ListRemarqueComponent', () => {
  let component: ListRemarqueComponent;
  let fixture: ComponentFixture<ListRemarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRemarqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRemarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
