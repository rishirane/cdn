import {MatButtonModule, MatCheckboxModule, MatDialogModule,
     MatListModule, MatProgressBarModule, MatNativeDateModule, 
     MatCardModule, MatSelectModule, MatOptionModule, DateAdapter} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';

import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, 
        MatMenuModule, MatTabsModule, MatRadioModule, MatDialogModule, MatListModule, MatProgressBarModule, 
        MatAutocompleteModule, MatFormFieldModule, MatSlideToggleModule, MatInputModule, MatDatepickerModule, 
        MatNativeDateModule, MatCardModule, MatSelectModule, MatOptionModule, MatChipsModule],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, 
        MatMenuModule, MatTabsModule, MatRadioModule, MatDialogModule, MatListModule, MatProgressBarModule, 
        MatAutocompleteModule, MatFormFieldModule, MatSlideToggleModule, MatInputModule, MatDatepickerModule, 
        MatNativeDateModule, MatCardModule, MatSelectModule, MatOptionModule, MatChipsModule],
})
  export class MaterialModule { }



