// Angular core imports
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

// Angular router imports
import { RouterModule } from '@angular/router';

export interface Room {
  id: string | number;
  name: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  beds: number;
  amenities: string[];
}

@Component({
  selector: 'app-room-card',
  imports: [RouterModule],
  templateUrl: './room-card.html',
  styleUrl: './room-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RoomCard {
  @Input() room!: Room;

  /**
   * Função utilizada pelo *ngFor para rastrear cada amenidade pela sua string.
   * 
   * @param index Índice da amenidade na lista.
   * @param amenity String da amenidade.
   * @returns A própria string da amenidade.
   */
  protected trackByAmenity(index: number, amenity: string): string {
    return amenity;
  }
}
