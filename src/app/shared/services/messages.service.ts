import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageStatus } from '../enums/message-status.enum';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private readonly toastr = inject(ToastrService);
  public messageStatus = MessageStatus;

  public showMessage(message: string, messageStatus: string): void {
    switch (messageStatus) {
      case this.messageStatus.Success:
        this.toastr.success(message);
        break;
      case this.messageStatus.Warning:
        this.toastr.warning(message);
        break;
      case this.messageStatus.Error:
        this.toastr.error(message);
        break;
      default:
        alert(message);
    }
  }
}
