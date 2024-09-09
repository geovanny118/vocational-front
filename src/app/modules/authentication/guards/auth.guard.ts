import { inject } from "@angular/core";
import { CanMatchFn, CanActivateFn, Route, UrlSegment, Router } from "@angular/router";
import { AuthenticationService } from "../services";


export const AuthGuard: CanMatchFn = (route: Route, segmente: UrlSegment[]) => {
    const authenticationService: AuthenticationService = inject(AuthenticationService);
    const router: Router = inject(Router);

    if (authenticationService.isTokenExpired()) {
        console.log('AuthGuard: Token expired');
        authenticationService.logoutByExpiration();
        //router.navigateByUrl('/authentication/login');
        return false;
    }

    return authenticationService.isLoggedIn();
}

export const RedirectIfAuthenticatedGuard: CanActivateFn = () => {
    const authenticationService: AuthenticationService = inject(AuthenticationService);
    const router: Router = inject(Router);

    if (authenticationService.isLoggedIn()) {
        router.navigateByUrl('/user');
        return false;
    }
    return true;
}