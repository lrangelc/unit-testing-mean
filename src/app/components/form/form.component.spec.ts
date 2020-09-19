import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

class RepositoryServiceStub {
  savePins() {
    return of(true);
  }
}

class NavigationServiceStub {
  goToPins() {}
}

class MatSnackBarStub {
  open() {
    return {
      afterDismissed: () => {
        return of(true);
      },
    };
  }
}

fdescribe('BranchNameCellComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormComponent],
        providers: [
          { provide: RepositoryService, useClass: RepositoryServiceStub },
          { provide: NavigationService, useClase: NavigationServiceStub },
        ],
        imports: [
          ReactiveFormsModule,
          MatSnackBarModule,
          RouterModule.forRoot([]),
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
      // .overrideComponent(FormComponent, {
      //   set: { changeDetection: ChangeDetectionStrategy.Default },
      // })
      // .compileComponents();
    })
  );

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(FormComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it(
  //   'test description',
  //   waitForAsync(async () => {
  //     await fixture.whenStable();
  //   })
  // );

  // it('should create', () => {
  //   fixture = TestBed.createComponent(FormComponent);
  //   component = fixture.componentInstance;
  //   expect(component).toBeTruthy();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  describe('When component is initilizated', () => {
    it('Should create the forms', () => {
      // console.log(component.firstFormGroup.controls);
      // expect(Object.keys(component.firstFormGroup.controls)).toEqual([
      //   'title',
      //   'author',
      //   'description',
      // ]);
      // expect(Object.keys(component.secondFormGroup.controls)).toEqual([
      //   'firstAsset',
      //   'assets',
      // ]);
    });
  });

  describe('When addAsset is executed', () => {
    it('Should add new group', () => {
      // const assets = <FormArray>component.secondFormGroup.get('assets');
      // component.addAsset();
      // component.addAsset();
      // console.log(Object.keys(assets.controls));
      // expect(Object.keys(assets.controls)).toEqual(['0', '1']);
    });
  });

  describe('When deleteAsset', () => {
    it('Should remove the form control', () => {
      // const assets = <FormArray>component.secondFormGroup.get('assets');
      // component.addAsset();
      // component.deleteAsset(0);
      // expect(Object.keys(assets.controls)).toEqual([]);
    });
  });

  describe('When savePins is executed', () => {
    it('Should navigate to pins view', () => {
      // const navigate = spyOn((<any>component).navigate, 'goToPins');
      // const open = spyOn((<any>component).snackBar, 'open').and.callThrough();

      // component.savePin();

      // expect(navigate).toHaveBeenCalled();
      // console.log('working');
      // expect(open).toHaveBeenCalledWith(
      //   'Your pin is saved, Redirecting ...',
      //   'Cool!',
      //   {
      //     duration: 2000,
      //   }
      // );
    });
  });
});
