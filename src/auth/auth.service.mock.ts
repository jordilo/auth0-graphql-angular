import { Subject, Observable } from 'rxjs';
import { AuthUser } from './auth';

const tokenSubject = new Subject<string>();
const userSubject = new Subject<AuthUser>();
const defaultUser: AuthUser = {
    email: 'test@tes.com',
    email_verified: true,
    name: 'test',
    nickname: 'test',
    picture: '',
    sub: '"auth0|122334abcdef"',
    updated_at: '2020-04-25T08:28:17.576Z'
};
export class AuthServiceMock {
    public get user(): AuthUser { return defaultUser; }
    public get user$(): Observable<AuthUser> { return userSubject; }
    public get token$(): Observable<string> { return tokenSubject; }
    public get isLoggedIn(): boolean { return true; }
    public accessToken: string;
    public authorize(): void { }
    public login(username: string, password: string): Observable<any> {
        return new Subject<any>();
    }
    public singup(email: string, password: string): Observable<any> {
        return new Subject<any>();
    }
    public changePassword(email: string): Observable<any> {
        return new Subject<any>();
    }
    public handleLoginCallback() { }
    public logout() { }
}
