import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AsyncPipe, JsonPipe } from "@angular/common";

import { TicketService } from "../../shared/providers/ticket.service";
import { TicketComponent } from "../../shared/components/ticket/ticket.component";
import { Ticket } from "../../shared/models/ticket";

@Component({
  standalone: true,
  imports: [TicketComponent, AsyncPipe, JsonPipe],
  selector: "app-shop",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CartComponent {
  #ticketService = inject(TicketService);

  cart$ = this.#ticketService.cart;

  removeTicket({ id }: Ticket): void {
    this.#ticketService.removeTicket(id);
  }
}
