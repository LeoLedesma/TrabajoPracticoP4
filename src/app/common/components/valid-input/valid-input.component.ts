import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-valid-input',
  templateUrl: './valid-input.component.html',
  styleUrls: ['./valid-input.component.css']
})
export class ValidInputComponent {

  @Input() input!: AbstractControl | null

}
