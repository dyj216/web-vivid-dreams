import { Injectable } from '@angular/core';

import { WORDS } from './words';
import { shuffle } from './util';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  words = WORDS;
  correctlyGuessed: string[] = [];
  incorrectlyGuessed: string[] = [];
  remembered: string[] = [];
  discarded: string[] = [];

  roundDuration: number;

  constructor() { }

  changeRoundDuration(duration: number) {
    this.roundDuration = duration;
  }

  shuffleWords() {
    this.words = shuffle(this.words);
  }
}
