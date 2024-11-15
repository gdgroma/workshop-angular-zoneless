import { Component, inject, OnInit } from '@angular/core';

import { TicketComponent } from '../../shared/components/ticket/ticket.component';
import { TicketService } from '../../shared/providers/ticket.service';
import { Ticket } from '../../shared/models/ticket';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  imports: [TicketComponent, SearchBarComponent],
})
export default class ShopComponent implements OnInit {
  #ticketService = inject(TicketService);
  tickets: Ticket[] = [];

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.#ticketService.getTickets().subscribe((ticktes) => (this.tickets = ticktes));
  }

  searchTicket(query: string): void {
    if (query.length === 0) this.getTickets();
    else this.#ticketService.getTicketByQuery(query).subscribe((ticktes) => (this.tickets = ticktes));
  }
}
