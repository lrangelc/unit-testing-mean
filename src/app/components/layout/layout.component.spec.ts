import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionsComponent } from '../actions/actions.component';

import { LayoutComponent } from './layout.component';

class MatBottomSheetStub {
  open() {}
}

fdescribe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LayoutComponent],
        providers: [{ provide: MatBottomSheet, useClass: MatBottomSheetStub }],
        imports: [
          RouterTestingModule.withRoutes([
            { path: '', component: LayoutComponent },
            { path: 'app/add', component: LayoutComponent },
          ]),
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set the editMode to false', () => {
    const verifyEditMode = spyOn(component, 'verifyEditMode').and.callThrough();

    fixture.ngZone.run(() => {
      (<any>component).router.navigate(['/']);

      fixture.whenStable().then(() => {
        expect(component.editMode).toBeFalsy();
        expect(verifyEditMode).toHaveBeenCalled();
      });
    });
  });

  it('Should open', () => {
    const open = spyOn((<any>component).bottomSheet, 'open');

    component.openBottomSheet();

    expect(open).toHaveBeenCalledWith(ActionsComponent);
  });


  it('Should set the editMode to true', () => {
    const verifyEditMode = spyOn(component, 'verifyEditMode').and.callThrough();

    fixture.ngZone.run(() => {
      (<any>component).router.navigate(['app/add']);

      fixture.whenStable().then(() => {
        expect(component.editMode).toBeTruthy();
        expect(verifyEditMode).toHaveBeenCalled();
      });
    });
  });
});
