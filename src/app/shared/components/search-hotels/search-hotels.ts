import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-hotels',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-hotels.html',
  styleUrl: './search-hotels.scss'
})
export class SearchHotels implements OnInit {
 public searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      destination: [''],
      checkin: [''],
      checkout: [''],
      guests: ['']
    });
  }

  public handleSearch(): void {
    const formValue = this.searchForm.value;

    this.router.navigate(['/hoteis'], {
      queryParams: {
        city: formValue.destination,
        guestCapacity: formValue.guests
      }
    });
  }
}
