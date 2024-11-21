import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";

describe('AuthService test', () => {
    let service: AuthService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        })
        service = TestBed.inject(AuthService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('Deberia hacer una llamada a Register y devolver el resultado', () =>{
        const email = 'text@test.com'
        const password = '#Clave1234'
        const mockResponse = { ok: true, msg: 'User registered successfuly'}
        service.register(email, password).subscribe(response => {
            expect(response).toEqual(mockResponse)
        })

        const req = httpMock.expectOne(`${service['apiUrl']}/register`)
        expect(req.request.method).toBe('POST')
        expect(req.request.body).toEqual({ email, password })

        req.flush(mockResponse)
    })

    it('Deberia hacer una llamada a Loginr y devolver el resultado', () =>{
        const email = 'text@test.com'
        const password = '#Clave1234'
        const token = '12345'
        const mockResponse = { ok: true, msg: 'Welcome', token: token}
        service.login(email, password).subscribe(response => {
            expect(response).toEqual(mockResponse)
        })

        const req = httpMock.expectOne(`${service['apiUrl']}/login`)
        expect(req.request.method).toBe('POST')
        expect(req.request.body).toEqual({ email, password })

        req.flush(mockResponse)
    })

    it('Deberia traer un token de session  storage', () => {
        const token = '12345'
        sessionStorage.setItem('token', token)
        expect(service.getToken()).toBe(token)
    })
})