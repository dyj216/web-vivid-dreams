import { Injectable } from '@angular/core';

import { shuffle } from './util';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  words: string[];
  correctlyGuessed: string[] = [];
  incorrectlyGuessed: string[] = [];
  remembered: string[] = [];
  discarded: string[] = [];
  langCode: string = 'hu';

  dreamerPoints = 0;
  sandmanPoints = 0;
  fairyPoints = 0;
  bogeymanPoints = 0;

  setupComplete = false;

  roundDuration: number;

  constructor() { }

  loadWords(words: string[]) {
    this.words = words;
  }

  removeUsedWords() {
    let usedWords: string[] = this.getItem(this.langCode);
    let filteredWords = this.words.filter((word) => !usedWords.includes(word));
    if (filteredWords.length === 0) {
      this.removeItem(this.langCode);
      filteredWords = this.words;
    }
    this.words = filteredWords;
    console.log(this.words);
  }

  changeRoundDuration(duration: number) {
    this.roundDuration = duration;
  }

  shuffleWords() {
    this.words = shuffle(this.words);
  }

  putCurrentWordAway(newPlace: string[]) {
    let currentWord = this.words.shift();
    newPlace.push(currentWord);

    let usedWords: string[] = this.getItem(this.langCode);
    usedWords.push(currentWord);
    this.setItem(this.langCode, usedWords);

    if (this.words.length === 0) {
      this.words.push(...this.discarded);
      this.shuffleWords();
      this.discarded = [];
    }
  }

  handleRemembering(word: string) {
    if (this.remembered.includes(word)) {
      this.remembered.splice(this.remembered.indexOf(word), 1);
    }
    else {
      this.remembered.push(word);
    }
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
    this.discarded.push(...this.correctlyGuessed);
    this.correctlyGuessed = [];
    this.discarded.push(...this.incorrectlyGuessed);
    this.incorrectlyGuessed = [];
  }

  getItem(key: string) {
    const item = localStorage.getItem(key);
    return (item) ? JSON.parse(item) : [];
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, Array.isArray(value) ? JSON.stringify(value) : JSON.stringify([value]));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
