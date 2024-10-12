import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Observable to hold the search query
  private searchQuerySource = new BehaviorSubject<string>('');
  currentSearchQuery = this.searchQuerySource.asObservable();

  constructor() {}

  // Method to update the search query
  updateSearchQuery(query: string): void {
    this.searchQuerySource.next(query);
  }
}
