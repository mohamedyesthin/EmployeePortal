import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dynamicformbuilder } from './dynamicformbuilder';

describe('Dynamicformbuilder', () => {
  let component: Dynamicformbuilder;
  let fixture: ComponentFixture<Dynamicformbuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dynamicformbuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dynamicformbuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
