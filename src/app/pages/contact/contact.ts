import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [Navbar, Footer, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  public howItWorksSteps = [
    {
      icon: 'map-pin',
      title: '1. Escolha seu destino',
      description: 'Navegue por nossa seleção de hotéis e encontre o destino perfeito para sua viagem. Use nossos filtros para refinar sua busca.'
    },
    {
      icon: 'credit-card',
      title: '2. Reserve com segurança',
      description: 'Faça sua reserva de forma rápida e segura. Nosso sistema protege seus dados e garante a melhor experiência de compra.'
    },
    {
      icon: 'users',
      title: '3. Aproveite sua viagem',
      description: 'Chegue ao seu destino com tudo organizado. Nossa equipe está sempre disponível para ajudar durante sua estadia.'
    }
  ];

  public differentiators = [
    {
      icon: 'shield',
      title: 'Segurança garantida',
      description: 'Transações 100% seguras com criptografia de ponta.'
    },
    {
      icon: 'headphones',
      title: 'Suporte 24/7',
      description: 'Equipe disponível a qualquer hora para ajudar você.'
    },
    {
      icon: 'best-price',
      title: 'Melhor preço',
      description: 'Preços competitivos e promoções exclusivas.'
    },
    {
      icon: 'clock',
      title: 'Cancelamento flexível',
      description: 'Políticas de cancelamento justas e transparentes.'
    }
  ];

  public faqItems = [
    {
      question: 'Como posso cancelar minha reserva?',
      answer: 'Você pode cancelar sua reserva através da área "Minhas Reservas" ou entrando em contato conosco. As condições de cancelamento variam conforme a política do hotel.'
    },
    {
      question: 'Posso alterar minha reserva?',
      answer: 'Sim! Alterações podem ser feitas até 24 horas antes do check-in, sujeitas à disponibilidade e possíveis taxas adicionais.'
    },
    {
      question: 'Como funciona o pagamento?',
      answer: 'Aceitamos cartões de crédito, débito e PIX. O pagamento é processado de forma segura e você recebe a confirmação imediatamente.'
    },
    {
      question: 'E se eu tiver problemas durante a estadia?',
      answer: 'Nossa equipe está disponível 24/7 para resolver qualquer problema. Entre em contato conosco imediatamente e cuidaremos de tudo.'
    }
  ];
}
