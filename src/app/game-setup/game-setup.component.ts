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
  customWords: string;

  constructor(
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.langCode = window.location.pathname.split("/").reverse()[1];
  }

  async loadJsonWords(languageCode: string) {
    return (await import(`../words/${languageCode}.json`)).default;
  }

  loadCustomWords() {
    let words = this.customWords.split(',');
    if (words.length === 1) {
      words = this.customWords.split('\n');
    }
    for (let word of words) {
      word.trim();
    }
    return words;
  }

  async setUpAndStartGame() {
    this.gameService.changeRoundDuration(this.roundDuration);
    if (this.langCode === 'custom') {
      this.gameService.loadWords(this.loadCustomWords());
    } else {
      this.gameService.loadWords(await this.loadJsonWords(this.langCode));
    }

    this.gameService.newRound();
    await this.router.navigate(['/', 'guess']);
  }
}
