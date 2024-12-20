import { Component, input, output } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  selector: 'app-ticket',
  styleUrls: ['./ticket.component.scss'],
  template: `<div class="ticket">
    @let value = ticket();

    <div class="ticket__shadow"></div>

    <section class="ticket__header">
      <p>{{ value.location }}</p>
      @if(value.price > 0) {
        <p title>{{ value.title }} - {{ value.price | currency }}</p>
      } @else {
        <p title>{{ value.title }} - free</p>
      }
      <p date>{{ value.date | date }}</p>
    </section>

    <section class="ticket__footer">
      <label title>About the event</label>
      <p about>{{value.about}}</p>
    </section>

    <ng-content>
      <button (click)="add()">add to cart</button>
    </ng-content>
  </div>`,
})
export class TicketComponent {
  ticket = input.required<Ticket>();

  addTicket = output<Ticket>();

  add(): void {
    this.addTicket.emit(this.ticket());
  }
}
