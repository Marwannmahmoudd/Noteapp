import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  namemenu:string = "login"
constructor(private router:Router){
  this.router.events.subscribe({
    next:(res)=>{
      if(res instanceof NavigationEnd){
        console.log(res);
        this.namemenu = res.url.replace('/','')
      }
      
    }
  })
}
}
