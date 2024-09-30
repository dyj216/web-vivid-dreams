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
  clearUsedWords: boolean = true;

  constructor(
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.langCode = window.location.pathname.split("/").reverse()[1];
    let storedValue = localStorage.getItem("clear-used-words");
    this.clearUsedWords = storedValue ? JSON.parse(storedValue) : true;
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
    if (this.clearUsedWords) {
      this.gameService.clearLocalStorage();
    }
    this.gameService.changeRoundDuration(this.roundDuration);
    if (this.langCode === 'custom') {
      this.gameService.loadWords(this.loadCustomWords());
    } else {
      this.gameService.loadWords(await this.loadJsonWords(this.langCode));
    }
    this.gameService.langCode = this.langCode;
    localStorage.setItem("clear-used-words", JSON.stringify(this.clearUsedWords));
    this.gameService.removeUsedWords();
    this.gameService.shuffleWords();
    this.gameService.setArrayItem("words", this.gameService.words);
    this.gameService.newRound();
    this.gameService.setupComplete = true;
    await this.router.navigate(['/', 'guess']);
  }
}
