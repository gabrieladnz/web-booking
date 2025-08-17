import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { Footer } from "../../shared/components/footer/footer";
import { SearchHotels } from "../../shared/components/search-hotels/search-hotels";
import { RoomCard } from '../../shared/components/room-card/room-card';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Footer, SearchHotels, RoomCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  public features = [
    {
      icon: 'shield',
      title: "Reserva segura",
      description: "Sua reserva é protegida com criptografia de ponta e políticas claras de cancelamento."
    },
    {
      icon: 'clock',
      title: "Cancelamento flexível",
      description: "Cancele até 3 dias antes da data sem custo adicional. Política transparente e justa."
    },
    {
      icon: 'star',
      title: "Hotéis verificados",
      description: "Todos os nossos hotéis são cuidadosamente selecionados e avaliados pelos hóspedes."
    },
    {
      icon: 'headphones',
      title: "Suporte 24/7",
      description: "Nossa equipe está sempre disponível para ajudar você antes, durante e após sua estadia."
    },
    {
      icon: 'credit-card',
      title: "Pagamento fácil",
      description: "Múltiplas formas de pagamento aceitas. Processo simples e seguro."
    },
    {
      icon: 'map-pin',
      title: "Múltiplos destinos",
      description: "Hotéis em 25+ cidades brasileiras. Encontre o destino perfeito para você."
    }
  ];

  public roomTypes = [
    { id: 1, name: "Quarto simples", description: "Perfeito para uma pessoa, com todo conforto necessário", capacity: "1 pessoa", beds: "1 cama de solteiro", price: "R$ 180", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop", amenities: ["Wi-Fi", "TV", "Ar-condicionado", "Frigobar"] },
    { id: 2, name: "Quarto duplo", description: "Ideal para duas pessoas em camas separadas", capacity: "2 pessoas", beds: "2 camas de solteiro", price: "R$ 280", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop", amenities: ["Wi-Fi", "TV", "Ar-condicionado", "Frigobar", "Mesa de trabalho"] },
    { id: 3, name: "Quarto triplo", description: "Espaçoso para até três pessoas", capacity: "3 pessoas", beds: "3 camas de solteiro", price: "R$ 350", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop", amenities: ["Wi-Fi", "TV", "Ar-condicionado", "Frigobar", "Varanda"] },
    { id: 4, name: "Suíte casal", description: "Romântica e elegante para dois", capacity: "2 pessoas", beds: "1 cama de casal", price: "R$ 450", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop", amenities: ["Wi-Fi", "TV", "Ar-condicionado", "Frigobar", "Banheira", "Varanda"] },
    { id: 5, name: "Suíte família", description: "Perfeita para famílias com crianças", capacity: "4 pessoas", beds: "1 cama de casal + 1 cama auxiliar", price: "R$ 580", image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop", amenities: ["Wi-Fi", "TV", "Ar-condicionado", "Frigobar", "Sala de estar", "Varanda", "Berço disponível"] }
  ];
}
