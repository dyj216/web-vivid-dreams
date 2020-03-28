import { Injectable } from '@angular/core';

import { WORDS } from './words';
import { shuffle } from './util';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  words = WORDS;
  correctlyGuessed: string[] = [];
  incorrectlyGuessed: string[] = [];
  remembered: string[] = [];
  discarded: string[] = [];

  dreamerPoints = 0;
  sandmanPoints = 0;
  fairyPoints = 0;
  bogeymanPoints = 0;

  roundDuration: number;

  constructor() { }

  changeRoundDuration(duration: number) {
    this.roundDuration = duration;
  }

  shuffleWords() {
    this.words = shuffle(this.words);
  }

  score() {
    const extra = this.correctlyGuessed.length === this.remembered.length && this.correctlyGuessed.length > 0 ? 2 : 0;
    this.dreamerPoints = this.correctlyGuessed.length + extra;
    this.fairyPoints = this.correctlyGuessed.length;
    this.bogeymanPoints = this.incorrectlyGuessed.length;
    const difference = Math.abs(this.correctlyGuessed.length - this.incorrectlyGuessed.length);
    if (difference === 0) {
      this.sandmanPoints = this.correctlyGuessed.length + 2;
    } else if (difference === 1) {
      this.sandmanPoints = Math.max(this.correctlyGuessed.length, this.incorrectlyGuessed.length);
    } else {
      this.sandmanPoints = Math.min(this.correctlyGuessed.length, this.incorrectlyGuessed.length);
    }
  }

  newRound() {
    this.sandmanPoints = 0;
    this.fairyPoints = 0;
    this.dreamerPoints = 0;
    this.bogeymanPoints = 0;
    this.remembered = [];
    this.discarded.concat(this.correctlyGuessed);
    this.correctlyGuessed = [];
    this.discarded.concat(this.incorrectlyGuessed);
    this.incorrectlyGuessed = [];
  }
}
