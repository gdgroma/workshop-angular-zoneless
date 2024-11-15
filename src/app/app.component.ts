import { Component, inject } from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';
import { TicketService } from './shared/providers/ticket.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  router = inject(Router);
  quantity$ = inject(TicketService).quantity;

  goToCart(): void {
    console.log('Here?');
    this.router.navigate(['/cart']);
  }
}
