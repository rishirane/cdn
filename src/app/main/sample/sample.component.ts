import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

import { takeUntil, combineAll } from 'rxjs/operators';

import { FuseSearchBarComponent } from '../../../@fuse/components/search-bar/search-bar.component';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent implements OnInit

{


    // Vertical Stepper
    verticalStepperStep1: FormGroup;
    verticalStepperStep2: FormGroup;
    verticalStepperStep3: FormGroup;

    private _unsubscribeAll: Subject<any>;

    firstValue: number;
    secondValue: number;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }


    ngOnInit() {
        // Vertical Stepper form stepper
        this.verticalStepperStep1 = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName : ['', Validators.required]
        });
        this.verticalStepperStep2 = this._formBuilder.group({
            address: ['', Validators.required]
        });


        this.calculateTotal();

    }

    calculateTotal () {
        this.verticalStepperStep1.controls['firstName'].valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {
                this.firstValue = selectedValue;
                this.calculateFinalValue();
        })
    
        this.verticalStepperStep1.controls['lastName'].valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {
                this.secondValue = selectedValue;
                this.calculateFinalValue();
                
        })
    
    }
        
    calculateFinalValue(){
    
        let FinalTotal = this.firstValue * this.secondValue;
        this.verticalStepperStep2.patchValue({"address": FinalTotal});   
    }
    

    finishVerticalStepper(data1, data2) {
        console.log(data1);
        console.log(data2);
    }

    search(event) {
        console.log(event);
    }

}
