import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AsyncPipe, JsonPipe } from "@angular/common";

import { TicketService } from "../../shared/providers/ticket.service";
import { TicketComponent } from "../../shared/components/ticket/ticket.component";
import { Ticket } from "../../shared/models/ticket";
import { Cart } from "../../shared/models/cart";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { delay } from "rxjs";

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

  cart: Cart[] = [];

  constructor() {
    // delay(2000)
    this.#ticketService.cart
      .pipe(takeUntilDestroyed())
      .subscribe((cart) => (this.cart = cart));
  }

  removeTicket({ id }: Ticket): void {
    this.#ticketService.removeTicket(id);
  }
}
