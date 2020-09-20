import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PinsComponent } from './components/pins/pins.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { ActionsComponent } from './components/actions/actions.component';
import { FormComponent } from './components/form/form.component';
import { ApiService } from './services/api.service';
import { RepositoryService } from './services/repository.service';
import { NavigationService } from './services/navigation.service';
import { PinsService } from './components/pins/pins.service';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [AppComponent, PinsComponent, LayoutComponent, MenuComponent, ActionsComponent, FormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatStepperModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule,
    OverlayModule
  ],
  entryComponents: [ActionsComponent],
  providers: [ApiService, RepositoryService, NavigationService, PinsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
