import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Ticket } from '../models/ticket';
import { TICKETS } from '../const/response/tickets';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  getTickets(): Observable<Ticket[]> {
    return of(TICKETS).pipe(delay(500));
  }
}
