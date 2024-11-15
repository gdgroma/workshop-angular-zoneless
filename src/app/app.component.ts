import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
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
  cdr = inject(ChangeDetectorRef);

  #ticketService = inject(TicketService);

  quantity$ = this.#ticketService.quantity;
  price$ = this.#ticketService.price;

  goToCart(): void {
    this.router.navigate(["/cart"]);
  }

  goToShop(): void {
    this.router.navigate(["/shop"]);
  }
}
