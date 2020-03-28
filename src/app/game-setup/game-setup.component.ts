import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss']
})
export class GameSetupComponent implements OnInit {
  roundDuration = 120;

  constructor(private gameService: GameService) {}

  ngOnInit() {
  }

  setRoundDuration() {
    this.gameService.changeRoundDuration(this.roundDuration);
  }

}
