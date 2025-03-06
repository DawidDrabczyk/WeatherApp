import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-webcamera',
    templateUrl: './webcamera.component.html',
    standalone: true,
    styleUrl: './webcamera.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebcameraComponent {}
