import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarwarsMainComponent} from './starwars-main-component';

describe('StarwarsMain', () => {
  let component: StarwarsMainComponent;
  let fixture: ComponentFixture<StarwarsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarwarsMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarwarsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
