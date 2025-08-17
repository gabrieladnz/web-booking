import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-hotels',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-hotels.html',
  styleUrl: './search-hotels.scss'
})
export class SearchHotels implements OnInit {
  public searchForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.searchForm = this.fb.group({
      destination: [''],
      checkin: [''],
      checkout: [''],
      guests: ['']
    });
  }

  public handleSearch(): void {
    console.log("Searching with data:", this.searchForm.value);
  }
}
