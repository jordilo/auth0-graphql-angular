import { AuthHttpInterceptorService } from './auth.http.interceptor';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { CallbackComponent } from './callback.component';
import { AuthGuard } from './auth.guard';
import { AuthConfig } from './auth';
import { AuthConfigService } from './auth-config.service';
import { AuthSigninComponent } from './auth.signin.component';
import { AuthSignupComponent } from './auth.signup.component';
import { CommonModule } from '@angular/common';
import { AuthPasswordResetComponent } from './auth.password-reset.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutes } from './auth.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


const routes: Routes = [
  {
    path: AuthRoutes.CALLBACK,
    component: CallbackComponent
  },
  {
    path: AuthRoutes.SIGNIN,
    component: AuthSigninComponent
  },
  {
    path: AuthRoutes.PASSWORD_RESET,
    component: AuthPasswordResetComponent
  },
  {
    path: AuthRoutes.SIGNUP,
    component: AuthSignupComponent
  }
];

@NgModule({
  providers: [AuthService, AuthGuard],
  declarations: [CallbackComponent, AuthSigninComponent, AuthSignupComponent, AuthPasswordResetComponent],
  imports: [CommonModule, ReactiveFormsModule, CommonModule, RouterModule.forRoot(routes)],
})
export class AuthModule {
  static forRoot(config: AuthConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        { provide: AuthConfigService, useFactory: generateAutoConfigFactory(config) },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptorService,
          multi: true
        }
      ]
    };
  }
}

// tslint:disable-next-line:ban-types
function generateAutoConfigFactory(config: AuthConfig): Function {
  return () => ({
    clientID: config.clientID,
    domain: config.domain,
    redirectUri: config.redirectUri,
    returnTo: config.returnTo,
    scope: config.scope || 'openid profile email',
    audience: config.audience || `https://${config.domain}/userinfo`,
    responseType: config.responseType || 'token id_token',
  } as AuthConfig);
}
