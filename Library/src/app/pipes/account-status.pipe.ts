import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountStatus'
})
export class AccountStatusPipe implements PipeTransform {

  transform(value: boolean): string {
    if(value == true){
      return '<span class="color-green">Active</span>';
    }
    else if(value == false){
      return '<span class="color-red">Not Active</span>';
    }
    else return '';
  }

}
