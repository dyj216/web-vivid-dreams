import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessComponent } from './guess.component';
import { GameService } from '../game.service';

describe('GuessComponent', () => {
  let component: GuessComponent;
  let fixture: ComponentFixture<GuessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    const gameService = TestBed.inject(GameService);
    gameService.words = ['apple', 'pear'];
    gameService.roundDuration = 60;
    gameService.setupComplete = true;
    fixture = TestBed.createComponent(GuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
