import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSetupComponent } from './game-setup.component';

describe('GameSetupComponent', () => {
  let component: GameSetupComponent;
  let fixture: ComponentFixture<GameSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSetupComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trim comma separated custom words', () => {
    component.customWords = 'apple, pear ,plum';
    expect(component.loadCustomWords()).toEqual(['apple', 'pear', 'plum']);
  });

  it('should trim line separated custom words and drop empty lines', () => {
    component.customWords = ' apple\npear \n\nplum\n';
    expect(component.loadCustomWords()).toEqual(['apple', 'pear', 'plum']);
  });
});
