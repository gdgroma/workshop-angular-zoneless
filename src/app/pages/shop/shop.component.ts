import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
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
export default class ShopComponent implements OnInit {
  cdr = inject(ChangeDetectorRef);

  #ticketService = inject(TicketService);

  tickets: Ticket[] = [];

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.#ticketService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;
      this.cdr.markForCheck();
    });
  }

  searchTicket(query: string): void {
    if (query.length === 0) this.getTickets();
    else
      this.#ticketService.getTicketByQuery(query).subscribe((tickets) => {
        this.tickets = tickets;
        this.cdr.markForCheck();
      });
  }

  addTicket(ticket: Ticket): void {
    this.#ticketService.addTicket(ticket);
  }
}
