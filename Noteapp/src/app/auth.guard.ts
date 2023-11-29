import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

export const auth:CanActivateFn =(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
const auth = inject(UserService)
const router= inject(Router)
if(auth.user.getValue() !== null){
  return true
}else{
  router.navigate(['/login'])
  return false
}
}
