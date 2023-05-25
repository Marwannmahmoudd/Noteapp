import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(notes:any[], term:any): any {
    return notes.filter(notes=>notes.title.toLowerCase().includes(term.toLowerCase()))
  }

}
