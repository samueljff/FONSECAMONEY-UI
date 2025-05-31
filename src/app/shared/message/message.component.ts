import { Component, Input } from "@angular/core";
import { AbstractControl, FormControl, NgModel } from "@angular/forms";

@Component({
  selector: "app-message",
  template: `
    <div *ngIf="temErro()" class="p-message p-message-error">
      {{ text }}
    </div>
  `,
  styles: [
    `
      .p-message-error {
        margin: 0;
        margin-top: 4px;
        padding: 3px;
      }
    `,
  ],
})
export class MessageComponent {
  @Input() error: string = "";
  //Aceita tanto FormControl/AbstractControl quanto NgModel
  @Input() control?: AbstractControl | FormControl | NgModel | null;
  @Input() text: string = "";

  temErro(): boolean {
     //return this.control ? this.control.hasError(this.error) && this.control.dirty : true; 
      if (!this.control) return false;

    if ("hasError" in this.control && "dirty" in this.control) {
      return this.control
        ? this.control.hasError!(this.error) && this.control.dirty!
        : true;
    }

    return false;
  }
}
