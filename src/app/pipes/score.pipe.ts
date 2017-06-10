import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({name: 'score'})
export class ScorePipe implements PipeTransform {
    constructor(private decimalPipe: DecimalPipe) {}
    transform(value: number, fractionDigits: number): string {
        return value ? this.decimalPipe.transform(value, '1.' + fractionDigits + '-' + fractionDigits) : '';
    }
}