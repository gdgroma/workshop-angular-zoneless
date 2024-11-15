import { Component, input } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [DatePipe],
  selector: 'app-ticket',
  styleUrls: ['./ticket.component.scss'],
  template: `<div class="ticket">
    @let value = ticket();

    <div class="ticket__shadow"></div>

    <section class="ticket__header">
      <p>{{ value.location }}</p>
      <p title>{{ value.title }}</p>
      <p date>{{ value.date | date }}</p>
    </section>

    <section class="ticket__footer">
      <label title>About the event</label>
      <p about>{{value.about}}</p>
    </section>

    <button>add to cart</button>
  </div>`,
})
export class TicketComponent {
  ticket = input.required<Ticket>();
}
