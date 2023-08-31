import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prFilter'
})
export class PrFilterPipe implements PipeTransform {

  transform(result: any[], searchText: string): any[] {
    if (!result) return [];
    if (!searchText) return result;

    searchText = searchText.toLowerCase();

    return result.filter(item => {
      return (
        item.pr_requestor.toLowerCase().includes(searchText) ||
        item.pr_no.toLowerCase().includes(searchText) ||
        item.pr_status.toLowerCase().includes(searchText) ||
        item.pr_purpose.toLowerCase().includes(searchText) ||
        item.pr_division.toLowerCase().includes(searchText) ||
        item.pr_dateCreated.toLowerCase().includes(searchText)
      );
    });
  }

}
