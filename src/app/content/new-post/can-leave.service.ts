import { Injectable } from "@angular/core";
import { CanDeactivate} from "@angular/router";


export interface ConfirmLeaveComponent {
  canDeactivate: () => boolean;
}

@Injectable()
export class ConfirmLeaveGuard implements CanDeactivate<ConfirmLeaveComponent> {
  canDeactivate(component: ConfirmLeaveComponent): boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

