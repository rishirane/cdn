import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { SCMCurrency } from "@custom/transform/currency.pipe";


@Directive({ selector: "[scmCurrencyFormatter]" })
export class SCMCurrencyFormatterDirective implements OnInit  {
  
  
  
 

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: SCMCurrency
  ) {
    this.el = this.elementRef.nativeElement;

    if(this.el.type==="text" ){
      this.el.type="number";
      if(!this.el.classList.contains("readonly")){
        this.el.classList.add("scmnum");
      }
    }
  }

  ngOnInit() {
    this.el.value = this.currencyPipe.transform(this.el.value);

  }
  
  
  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
 
    this.el.value = ""+this.currencyPipe.parse(value); // opossite of transform
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
   
    this.el.value = this.currencyPipe.transform(value);
  }

  

  
}