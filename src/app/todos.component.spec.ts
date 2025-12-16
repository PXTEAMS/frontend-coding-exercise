import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos.component';
import { HttpClientModule } from '@angular/common/http';

describe('TodosComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                TodosComponent
            ],
        }).compileComponents();
    });

    it('has no user set by default', () => {
        const fixture = TestBed.createComponent(TodosComponent);
        const cmp = fixture.componentInstance;
        expect(cmp.user).toBeUndefined();
    });
});
