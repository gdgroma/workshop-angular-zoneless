import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { TicketComponent } from '../../shared/components/ticket/ticket.component';
import { TicketService } from '../../shared/providers/ticket.service';
import { Ticket } from '../../shared/models/ticket';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  imports: [TicketComponent, SearchBarComponent, JsonPipe, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShopComponent implements OnInit {
  #ticketService = inject(TicketService);
  
  tickets = signal<Ticket[]>([]);

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.#ticketService
      .getTickets()
      .subscribe((tickets) => (this.tickets.set(tickets)));
  }

  searchTicket(query: string): void {
    if (query.length === 0) this.getTickets();
    else
      this.#ticketService
        .getTicketByQuery(query)
        .subscribe((tickets) => (this.tickets.set(tickets)));
  }

  addTicket(ticket: Ticket): void {
    this.#ticketService.addTicket(ticket);
  }
}
