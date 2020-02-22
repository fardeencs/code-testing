import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlTreeViewComponent } from './html-tree-view.component';

describe('HtmlTreeViewComponent', () => {
  let component: HtmlTreeViewComponent;
  let fixture: ComponentFixture<HtmlTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
