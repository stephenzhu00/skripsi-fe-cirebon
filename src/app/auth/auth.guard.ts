import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private authService:AuthService
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!this.authService.loggedIn()){
            this.router.navigate(['auth/login']);
            return false;
        }
        if(route.data.id && route.data.id != this.authService.decodedToken.id){
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}