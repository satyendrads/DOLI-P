import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationPopupModel } from '../model/confirmation-popup.model';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html'
})

export class ConfirmationPopupComponent implements OnInit {
  @Input() inputModel: ConfirmationPopupModel;
  @Output() outputIsAccept: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  declineChanges() {
    this.outputIsAccept.emit(false);
  }

  acceptChanges() {
    this.outputIsAccept.emit(true);
  }

}