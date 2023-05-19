import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html', 
})
export class ModalComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {
  }

  @Input() black: boolean = false;

  @Output() onModalClose: EventEmitter<boolean> = new EventEmitter();
  closeModal() { this.onModalClose.emit(false) };

}
