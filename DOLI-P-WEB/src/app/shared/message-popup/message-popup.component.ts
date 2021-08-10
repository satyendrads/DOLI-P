import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessagePopupModel } from '../model/message-popup.model';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html'
})

export class MessagePopupComponent implements OnInit {
  @Input() inputPopupModel: MessagePopupModel;
  @Output() outputIsPopupViewed: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closePopup() {
    this.outputIsPopupViewed.emit(true);
  }

}
