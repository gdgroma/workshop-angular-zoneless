import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";

import { TicketComponent } from "../../shared/components/ticket/ticket.component";
import { TicketService } from "../../shared/providers/ticket.service";
import { Ticket } from "../../shared/models/ticket";
import { SearchBarComponent } from "../../shared/components/search-bar/search-bar.component";
import { AsyncPipe, JsonPipe } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"],
  imports: [TicketComponent, SearchBarComponent, JsonPipe, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShopComponent {
  cdr = inject(ChangeDetectorRef);

  #ticketService = inject(TicketService);

  tickets$ = this.#ticketService.getTickets();

  searchTicket(query: string): void {
    if (query.length === 0) this.tickets$ = this.#ticketService.getTickets();
    else this.tickets$ = this.#ticketService.getTicketByQuery(query);
  }

  addTicket(ticket: Ticket): void {
    this.#ticketService.addTicket(ticket);
  }
}
