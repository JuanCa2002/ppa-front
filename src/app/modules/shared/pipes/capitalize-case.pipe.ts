import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'CapitalizePipe'
  })
  export class CapitalizePipe implements PipeTransform {
  
  
    transform(text: string): string {
        if (!text) return text;
    
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
} 