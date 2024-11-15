import { Injectable } from '@angular/core';
import { delay, filter, Observable, of, switchMap, toArray } from 'rxjs';
import { Ticket } from '../models/ticket';
import { TICKETS } from '../const/response/tickets';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  getTickets(): Observable<Ticket[]> {
    return of(TICKETS).pipe(delay(500));
  }

  getTicketByQuery(query: string): Observable<Ticket[]> {
    return this.getTickets().pipe(
      switchMap(tickets => tickets),
      filter(ticket => ticket.title.toLowerCase().includes(query.toLowerCase())),
      toArray());
  }
}
