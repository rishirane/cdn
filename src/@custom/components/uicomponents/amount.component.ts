import { Component, Input, OnInit, HostBinding, ElementRef, ViewChild, ViewContainerRef, OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { LoginService } from "app/main/login/logindetails.service";
import { SCMCurrency } from "@custom/transform/currency.pipe";

@Component({
    selector: 'amount-component',
    template: `
        <mat-form-field class="w-100-p" layout="row" layout-align="end-start">
            <input #inputcomp matInput min="0" scmCurrencyFormatter [formControl]="control" placeholder="{{placeHolder}}" style="text-align:right;"  (blur)="onBlur()" (focus)="onFocus()">
            <span matPrefix style="font-size=12px;">&nbsp;&nbsp;&nbsp;&nbsp;{{loginData.currency}}&nbsp;</span>
            <mat-error> {{errorMsg}} </mat-error>
        </mat-form-field>                                                        
      `
      
  })
  export class AmountComponent implements OnInit{
    
    

    @Input() control: AbstractControl
    @Input() wrapper_class: string;
    @Input() inputClass: string;

    @Input() errorMsg: string;

    @Input() placeHolder: string ="";

    @ViewChild('inputcomp', {read: ElementRef}) inputComp;

    

    private el: HTMLElement;

    loginData:any;
    constructor( private elementRef: ElementRef,private loginService: LoginService,private currencyPipe: SCMCurrency){
        this.el = this.elementRef.nativeElement;
    }


    prevVal:any;
    ngOnInit(): void {
        this.loginData=this.loginService.getloginDetails();
        this.control.valueChanges.subscribe((selectedValue) => {
            if(!this.isFocussed){

                let nativeEl=this.el as HTMLInputElement;
                if(this.prevVal!==selectedValue){
                    this.prevVal=selectedValue;
                    nativeEl.value = this.currencyPipe.transform(selectedValue);
                    this.control.patchValue( nativeEl.value);
                }
               
             
            }
          
        });
    }
    
    ngAfterViewInit(){
        
        if(this.wrapper_class){
            if(this.wrapper_class.indexOf(" ") !=-1){
                let classArr=this.wrapper_class.split(" ");
                if(classArr.length>0){
                    for(let i in classArr){
                        this.addClassToWrapperElement(classArr[i]);
                    }
                }
            }else{
                this.addClassToWrapperElement(this.wrapper_class);
            }
        }
      
        if(this.inputClass){
            if(this.inputClass.indexOf(" ") !=-1){
                let classArr=this.inputClass.split(" ");
                if(classArr.length>0){
                    for(let i in classArr){
                        this.addClassToInputElement(classArr[i]);
                    }
                }
            }else{
                this.addClassToInputElement(this.inputClass);
            }
        }
        
    }

    addClassToWrapperElement(className:string){
       
        if(this.el && !this.el.classList.contains(className)){
            this.el.classList.add(className);
        }
    }

    addClassToInputElement(className:string){
        let inputElem=this.inputComp.nativeElement;
        if(inputElem && !inputElem.classList.contains(className)){
            inputElem.classList.add(className);
        }
    }
    isFocussed:boolean=false;
    onFocus(){
        this.isFocussed=true;
    }
    onBlur() {
        this.isFocussed=false;
    }
  }