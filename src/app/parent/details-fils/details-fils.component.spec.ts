import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFilsComponent } from './details-fils.component';

describe('DetailsFilsComponent', () => {
  let component: DetailsFilsComponent;
  let fixture: ComponentFixture<DetailsFilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsFilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
