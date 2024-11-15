import { Component, output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-search',
    styleUrls: ['./search-bar.component.scss'],
    template: `
    <div class="search">
        <input type="text" placeholder="Search your ticket..." (input)="onInput($event)" />
        <span class="material-symbols-outlined">
            search
        </span>
    </div>
`,
})
export class SearchBarComponent {
    inputChange = output<string>()

    onInput(event: Event): void {
        const { value } = (event.target as HTMLInputElement);
        this.inputChange.emit(value);
    }
}
