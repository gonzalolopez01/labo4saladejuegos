import { Component, OnInit } from '@angular/core';
import { LoginsService } from '../../services/logins.service';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
 
  public chats:any[] = [];
  user?:any | null =  null;
  mensaje = '';

  constructor(private chat:LoginsService, private auth: Auth){

 }
 
  ngOnInit(): void {
    this.user = this.auth.currentUser?.email;
    this.chat.chats$.subscribe((chats: any[]) =>{
      this.chats = chats;    
    });
  }
  enviarMensaje(){
    this.chat.escribirChat(this.user, this.mensaje);    
  }

}