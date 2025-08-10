import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() suggestions: string[] = [];
  @Output() searchChange = new EventEmitter<string>();

  searchText = '';
  filteredSuggestions: string[] = [];
  showSuggestions = false;

  onInput() {
    const val = this.searchText.toLowerCase();
    this.filteredSuggestions = this.suggestions
      .filter(s => s.toLowerCase().includes(val));
    this.searchChange.emit(this.searchText);
    this.showSuggestions = true;
  }

  selectSuggestion(suggestion: string) {
    this.searchText = suggestion;
    this.searchChange.emit(this.searchText);
    this.showSuggestions = false;
  }

  closeSuggestions() {
    setTimeout(() => {  // Delay to allow click event on suggestion
      this.showSuggestions = false;
    }, 150);
  }

  openSuggestions() {
    if (this.searchText.length > 0) {
      this.showSuggestions = true;
    }
  }}
