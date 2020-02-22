/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JsPdfComponent } from './js-pdf.component';

describe('JsPdfComponent', () => {
  let component: JsPdfComponent;
  let fixture: ComponentFixture<JsPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
