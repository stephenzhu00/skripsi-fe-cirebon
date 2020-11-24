import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate{
    constructor(
        private router: Router,
        private authService:AuthService
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // TODO BUAT SERVICE ADMIN
        // if(!this.authService.loggedIn()){
        //     this.router.navigate(['auth/login']);
        //     return false;
        // }
        return true;
    }
}