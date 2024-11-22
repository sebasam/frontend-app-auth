import { TestBed, ComponentFixture } from "@angular/core/testing";
import { RegisterComponent } from "./register.component";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { of, throwError } from "rxjs";

describe('Estos son los test del register component', () => {
    let component: RegisterComponent
    let fixture: ComponentFixture<RegisterComponent>
    let authServiceSpy: jasmine.SpyObj<AuthService>
    let routerSpy: jasmine.SpyObj<Router>

    beforeEach(async() => {
        const authSpy = jasmine.createSpyObj('AuthService', ['register'])
        const routerSpyObj = jasmine.createSpyObj('Router', ['navigate'])
        await TestBed.configureTestingModule({
            imports: [RegisterComponent],
            providers: [
                { provide: AuthService, useValue: authSpy },
                { provide: Router, useValue: routerSpyObj }
            ]
        }).compileComponents()
        fixture = TestBed.createComponent(RegisterComponent)
        component = fixture.componentInstance
        authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>

        fixture.detectChanges()
    })

    it('Deberia crear el componente correctamente', () => {
        expect(component).toBeTruthy()
    })
})