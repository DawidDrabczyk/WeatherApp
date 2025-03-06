import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-world-camera',
    templateUrl: './world-camera.component.html',
    standalone: true,
    styleUrl: './world-camera.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldCameraComponent {

}
