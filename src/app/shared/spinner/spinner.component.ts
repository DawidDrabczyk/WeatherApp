import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    standalone: true,
    styleUrl: './spinner.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {

}
