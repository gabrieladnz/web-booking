// Angular core imports
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

// Application shared components
import { Navbar } from "../../shared/components/navbar/navbar";
import { Footer } from "../../shared/components/footer/footer";

// Application services and interfaces
import { HotelsService } from '../../core/services/hotels/hotels.service';
import { Hotel } from '../../core/services/hotels/hotels.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotel',
  imports: [Navbar, Footer, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './hotel.html',
  styleUrl: './hotel.scss'
})
export class HotelComponent implements OnInit {
  public allHotels: Hotel[] = [];
  public filteredHotels: Hotel[] = [];
  public cities: string[] = [];
  public filterForm!: FormGroup;
  public errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private hotelsService: HotelsService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public async ngOnInit(): Promise<void> {
    this.filterForm = this.fb.group({
      searchTerm: [''],
      selectedCity: ['all'],
      minPrice: [''],
      maxPrice: [''],
      guestCapacity: ['any']
    });

    await this.loadHotels();

    this.route.queryParams.subscribe(async (params) => {
      if (Object.keys(params).length > 0) {
        await this.loadHotelsWithFilters(params);
      } else {
        await this.loadHotels();
      }
    });

    this.filterForm.valueChanges.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  private async loadHotels(): Promise<void> {
    try {
      this.errorMessage = '';

      this.allHotels = await this.hotelsService.getAllHotels();

      this.filteredHotels = [...this.allHotels];
      this.cities = [...new Set(this.allHotels.map(hotel => hotel.location.city))];
      this.cdr.detectChanges();

    } catch (error) {
      this.errorMessage = 'Erro ao carregar hotéis. Tente novamente.';
      this.allHotels = [];
      this.filteredHotels = [];
      this.cities = [];
    }
  }

  private applyFilters(filters: any): void {
    this.filteredHotels = this.allHotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        hotel.location.city.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesCity = !filters.selectedCity || filters.selectedCity === "all" || hotel.location.city === filters.selectedCity;
      const matchesMinPrice = !filters.minPrice || hotel.pricePerNight >= parseFloat(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || hotel.pricePerNight <= parseFloat(filters.maxPrice);
      const matchesCapacity = !filters.guestCapacity || filters.guestCapacity === "any" || hotel.guestCapacity >= parseInt(filters.guestCapacity, 10);

      return matchesSearch && matchesCity && matchesMinPrice && matchesMaxPrice && matchesCapacity;
    });
  }

  public async refreshHotels(): Promise<void> {
    await this.loadHotels();
  }

  private async loadHotelsWithFilters(params: any): Promise<void> {
    try {
      this.errorMessage = '';

      const response = await this.hotelsService.getHotelsWithFilter(params);
      this.allHotels = response.items;
      this.filteredHotels = [...this.allHotels];
      this.cities = [...new Set(this.allHotels.map(hotel => hotel.location.city))];
      this.cdr.detectChanges();

    } catch (error) {
      this.errorMessage = 'Erro ao carregar hotéis com filtros.';
      this.allHotels = [];
      this.filteredHotels = [];
    }
  }

  protected checkHotelDetails(hotelId: string): void {
    this.router.navigate(['/hotel', hotelId]);
  }
}
