import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../game.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ScoreComponent implements OnInit {

  constructor(
    public gameService: GameService,
    private router: Router,
  ) {
    if (!this.gameService.setupComplete) {
      this.gameService.loadGame();
    }
  }

  ngOnInit() {
    if (!this.gameService.setupComplete) void this.router.navigate(['/']);
  }

}
