import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, filter, map, Observable, of, switchMap, toArray } from 'rxjs';

import { Ticket } from '../models/ticket';
import { Cart } from '../models/cart';

import { TICKETS } from '../const/response/tickets';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  #cart: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([]);

  get cart(): Observable<Cart[]> {
    return this.#cart.asObservable();
  }

  get quantity(): Observable<number> {
    return this.#cart.asObservable().pipe(map(cart => cart.reduce((a, b) => a + b.quantity, 0)));
  }

  get price(): Observable<number> {
    return this.#cart.asObservable().pipe(map(cart => cart.reduce((a, b) => a + b.ticket.price * b.quantity, 0)));
  }

  getTickets(): Observable<Ticket[]> {
    return of(TICKETS).pipe(delay(500));
  }

  getTicketByQuery(query: string): Observable<Ticket[]> {
    return this.getTickets()
      .pipe(
        switchMap(tickets => tickets),
        filter(ticket => ticket.title.toLowerCase().includes(query.toLowerCase())),
        toArray()
      );
  }

  addTicket(ticket: Ticket): void {
    const cart = this.#cart.getValue();
    const item = cart.find(item => item.ticket.id === ticket.id);

    if (item) item.quantity++;
    else {
      cart.push({
        ticket,
        quantity: 1
      })
    }

    this.#cart.next(cart);
  }

  removeTicket(tickeId: number): void {
    let cart = this.#cart.getValue();
    const itemId = cart.findIndex(item => item.ticket.id === tickeId);
    const {quantity } = cart[itemId]

    if (itemId > -1) {
      if (cart[itemId].quantity > 0) cart[itemId].quantity--;
      if (cart[itemId].quantity === 0) cart.splice(itemId, 1);
    }

    this.#cart.next(cart);
  }
}
