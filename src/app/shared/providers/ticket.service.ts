import { computed, Injectable, Signal, signal } from "@angular/core";
import { delay, filter, Observable, of, switchMap, toArray } from "rxjs";

import { Ticket } from "../models/ticket";
import { Cart } from "../models/cart";

import { TICKETS } from "../const/response/tickets";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  #cart = signal<Cart[]>([]);

  get cart(): Signal<Cart[]> {
    return this.#cart.asReadonly();
  }

  quantity = computed(() => this.#cart().reduce((a, b) => a + b.quantity, 0));

  price = computed(() =>
    this.#cart().reduce((a, b) => a + b.ticket.price * b.quantity, 0)
  );

  getTickets(): Observable<Ticket[]> {
    return of(TICKETS).pipe(delay(500));
  }

  getTicketByQuery(query: string): Observable<Ticket[]> {
    return this.getTickets().pipe(
      switchMap((tickets) => tickets),
      filter((ticket) =>
        ticket.title.toLowerCase().includes(query.toLowerCase())
      ),
      toArray()
    );
  }

  addTicket(ticket: Ticket): void {
    this.#cart.update((cart) => {
      const item = cart.find((item) => item.ticket.id === ticket.id);

      if (item) item.quantity++;
      else {
        cart.push({
          ticket,
          quantity: 1,
        });
      }
      return [...cart];
    });
  }

  removeTicket(tickeId: number): void {
    this.#cart.update((cart) => {
      const itemId = cart.findIndex((item) => item.ticket.id === tickeId);

      if (itemId > -1) {
        if (cart[itemId].quantity > 0) cart[itemId].quantity--;
        if (cart[itemId].quantity === 0) cart.splice(itemId, 1);
      }

      this.#cart.set(cart);

      return [...cart];
    });
  }
}
