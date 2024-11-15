import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, filter, map, Observable, of, switchMap, toArray } from 'rxjs';
import { Ticket } from '../models/ticket';
import { TICKETS } from '../const/response/tickets';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  #cart: BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);

  get cart(): Observable<Ticket[]> {
    return this.#cart.asObservable();
  }

  get quantity(): Observable<number> {
    return this.#cart.asObservable().pipe(map(cart => cart.length));
  }

  getTickets(): Observable<Ticket[]> {
    return of(TICKETS).pipe(delay(500));
  }

  getTicketByQuery(query: string): Observable<Ticket[]> {
    return this.getTickets().pipe(
      switchMap(tickets => tickets),
      filter(ticket => ticket.title.toLowerCase().includes(query.toLowerCase())),
      toArray());
  }

  addTicket(ticket: Ticket): void {
    this.#cart.next([...this.#cart.getValue(), ticket]);
  }

  removeTicket(tickeId: number): void {
    const tickets = this.#cart.getValue().filter(({ id }) => id !== tickeId);
    this.#cart.next(tickets);
  }
}
