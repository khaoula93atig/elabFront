import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../models/Utilisateur';
import {LoginService} from '../../login/login.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {UtilisateurServiceService} from '../../Services/utilisateur-service.service';
import {Message} from '../../models/message';
import {RxStompService} from '@stomp/ng2-stompjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-nabar-parent',
  templateUrl: './nabar-parent.component.html',
  styleUrls: ['./nabar-parent.component.css']
})
export class NabarParentComponent implements OnInit {

  user = new Utilisateur();

  nbr=0;
  notification=new Message();
  constructor(private stompService: RxStompService,
              private loginService: LoginService,
              private snackBar:MatSnackBar,
              private ToastService: ToastrService,
              private router: Router,
              private userService : UtilisateurServiceService
  ) {

    this.stompService.watch(`/channel/notif/`+loginService.currentUserValue.id).subscribe(res => {
      const data: Message = JSON.parse(res.body)
      this.notification=data;
      this.nbr++

    })
  }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);
  }
  logout(){
    this.loginService.logout();

    this.ToastService.info(`à la prochaine`);
  }
  getuserbyid(id: number){
    this.userService.getUserById(id).subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      },
      error => {
        console.log(error);
      }
    );}


}
