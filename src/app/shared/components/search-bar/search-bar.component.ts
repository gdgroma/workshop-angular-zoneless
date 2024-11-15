import { Component, output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-search',
    styleUrls: ['./search-bar.component.scss'],
    templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
    inputChange = output<string>()

    onInput(event: Event): void {
        const { value } = (event.target as HTMLInputElement);
        this.inputChange.emit(value);
    }
}
