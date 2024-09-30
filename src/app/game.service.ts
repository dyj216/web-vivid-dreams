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
    let usedWords: string[] = this.getArrayItem(this.langCode);
    let filteredWords = this.words.filter((word) => !usedWords.includes(word));
    if (filteredWords.length === 0) {
      this.removeItem(this.langCode);
      filteredWords = this.words;
    }
    this.words = filteredWords;
  }

  changeRoundDuration(duration: number) {
    this.roundDuration = duration;
    this.setItem("roundDuration", this.roundDuration);
    this.setItem("timeLeft", this.roundDuration);
  }

  shuffleWords() {
    this.words = shuffle(this.words);
  }

  putCurrentWordAway(newPlaceName: string, newPlace: string[]) {
    let currentWord = this.words.shift();
    newPlace.push(currentWord);

    this.setArrayItem(newPlaceName, newPlace);
    this.setArrayItem("words", this.words);

    let usedWords: string[] = this.getArrayItem(this.langCode);
    usedWords.push(currentWord);
    this.setArrayItem(this.langCode, usedWords);

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
    this.setArrayItem("remembered", this.remembered);
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

    this.setArrayItem("discarded", this.discarded);
    this.setArrayItem("correctlyGuessed", this.correctlyGuessed);
    this.setArrayItem("incorrectlyGuessed", this.incorrectlyGuessed);
    this.setArrayItem("remembered", this.remembered);
  }

  getArrayItem(key: string) {
    const item = localStorage.getItem(key);
    return (item) ? JSON.parse(item) : [];
  }

  setArrayItem(key: string, value: any): void {
    localStorage.setItem(key, Array.isArray(value) ? JSON.stringify(value) : JSON.stringify([value]));
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  loadGame() {
    let roundDuration = this.getItem("roundDuration");
    if (roundDuration === null) {
      return
    }
    this.roundDuration = JSON.parse(roundDuration);
    this.words = this.getArrayItem("words");
    this.correctlyGuessed = this.getArrayItem("correctlyGuessed");
    this.incorrectlyGuessed = this.getArrayItem("incorrectlyGuessed");
    this.remembered = this.getArrayItem("remembered");
    this.discarded = this.getArrayItem("discarded");
    this.score();
    this.setupComplete = true;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
