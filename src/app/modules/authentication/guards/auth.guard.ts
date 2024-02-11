import { inject } from "@angular/core";
import { CanMatchFn, Route, UrlSegment } from "@angular/router";
import { AuthenticationService } from "../services";


export const AuthGuard: CanMatchFn = (route: Route, segmente: UrlSegment[]) => {
    const authenticationService: AuthenticationService = inject(AuthenticationService);
    return authenticationService.isLoggedIn();
} 