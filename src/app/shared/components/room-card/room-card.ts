import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-card',
  imports: [RouterModule],
  templateUrl: './room-card.html',
  styleUrl: './room-card.scss'
})
export class RoomCard {
  @Input() room: any;
}
