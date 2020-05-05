import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnexoComponent } from './anexo.component';

describe('AnexoComponent', () => {
  let component: AnexoComponent;
  let fixture: ComponentFixture<AnexoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnexoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
