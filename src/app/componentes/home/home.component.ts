import { Component } from '@angular/core';
import { QuienSoyComponent } from '../quien-soy/quien-soy.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuienSoyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
