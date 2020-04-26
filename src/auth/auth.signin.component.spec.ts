import { AuthServiceMock } from './auth.service.mock';
import { environment } from './../environments/environment.prod';
import { AuthModule } from './auth.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthSigninComponent } from './auth.signin.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { EMPTY, throwError } from 'rxjs';
import { AuthConfigService } from './auth-config.service';
describe('Given a auth signin component', () => {


    let component: AuthSigninComponent;
    let fixture: ComponentFixture<AuthSigninComponent>;
    let element: HTMLElement;

    let authService: AuthService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthSigninComponent],
            providers: [{ provide: AuthService, useClass: AuthServiceMock }, AuthConfigService],
            imports: [FormsModule, ReactiveFormsModule, AuthModule.forRoot(environment.auth)]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthSigninComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        authService = fixture.debugElement.injector.get(AuthService);
        fixture.detectChanges();
    });

    it('Should be creater properly', () => {
        expect(component).toBeDefined();
        expect(element).toBeDefined();
    });

    it('when click on default login then autorize is called', () => {
        const authoizerSpy = spyOn(authService, 'authorize').and.returnValue(null);
        (element.querySelector('#call-to-default-login') as HTMLButtonElement).click();
        expect(authoizerSpy).toHaveBeenCalled();
    });
    it('when click on a valid form then login is called with correct parameters', () => {
        const loginSpy = spyOn(authService, 'login').and.returnValue(EMPTY);
        component.loginForm.setValue({ username: 'user-name', password: 'user-pwd' });
        fixture.detectChanges();
        (element.querySelector('#login-button') as HTMLButtonElement).click();
        expect(loginSpy).toHaveBeenCalled();
        expect(loginSpy).toHaveBeenCalledWith('user-name', 'user-pwd');
    });
    it('when click on a valid form and login throw an error then error is displayed', () => {
        spyOn(authService, 'login').and.returnValue(throwError({ description: 'this is an error' }));
        component.loginForm.setValue({ username: 'user-name', password: 'user-pwd' });
        fixture.detectChanges();
        (element.querySelector('#login-button') as HTMLButtonElement).click();
        fixture.detectChanges();
        expect(component.error).toEqual('this is an error');
    });
});
