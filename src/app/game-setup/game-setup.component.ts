import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss']
})
export class GameSetupComponent implements OnInit {
  roundDuration = 120;
  langCode: string;

  constructor(
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.langCode = window.location.pathname.split("/").reverse()[1];
  }

  async setUpAndStartGame() {
    this.gameService.changeRoundDuration(this.roundDuration);
    await this.gameService.loadWords(this.langCode);
    this.gameService.newRound();
    await this.router.navigate(['/', 'guess']);
  }
}
