import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, query: string): string {
    if (!query) {
      return value;
    }
    const regex = new RegExp(`(${query})`, 'gi');
    return value.replace(regex, '<span class="highlight">$1</span>');
  }
}