import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { LoginService } from 'app/main/login/logindetails.service';
@Directive({
  selector: '[addresscharpattern]'
})
export class AddressCharacterDirective {

  regexChars = 'a-zA-Z0-9 ,';
  regexStr = '^['+this.regexChars+']*$';

  @Input() isAlphaNumeric: boolean;

  constructor(private el: ElementRef,private _loginService: LoginService) {
    this.regexChars=this.regexChars+_loginService.loginData.addressAllowedSpecialChars;
    
    this.regexStr = '^['+this.regexChars+']*$';
  }


  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
  
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {
        var pattern = new RegExp('[^' +this.regexChars + ']','g');

        this.el.nativeElement.value = this.el.nativeElement.value.replace(pattern, '').replace(/\s/g, '');
        event.preventDefault();

    }, 1)
  }

}