import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { TicketService } from "./shared/providers/ticket.service";
import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, AsyncPipe, CurrencyPipe],
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  router = inject(Router);

  #ticketService = inject(TicketService);

  quantity = signal(0);
  price = signal(0);

  constructor() {
    this.#ticketService.quantity
      .pipe(takeUntilDestroyed())
      .subscribe((quantity) => this.quantity.set(quantity));

    this.#ticketService.price
      .pipe(takeUntilDestroyed())
      .subscribe((price) => this.price.set(price));
  }

  goToCart(): void {
    this.router.navigate(["/cart"]);
  }

  goToShop(): void {
    this.router.navigate(["/shop"]);
  }
}
