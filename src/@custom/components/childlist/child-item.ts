import { Type } from '@angular/core';

export class ChildItem {
  constructor(public component: Type<any>, public data: any) {}
}
