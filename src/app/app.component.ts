import { Component, inject } from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';
import { TicketService } from './shared/providers/ticket.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, CurrencyPipe],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  router = inject(Router);

  #ticketService = inject(TicketService);
  quantity$ = this.#ticketService.quantity;
  price$ = this.#ticketService.price;

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToShop(): void {
    this.router.navigate(['/shop']);
  }
}
