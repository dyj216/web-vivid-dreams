import {Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../game.service';
import {CountdownComponent, CountdownConfig, CountdownEvent, CountdownStatus} from 'ngx-countdown';
import {Router} from '@angular/router';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {
  countdownConfig: CountdownConfig;
  skipButtonEnabled = false;

  @ViewChild('cd') private countdown: CountdownComponent;

  constructor(
    public gameService: GameService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.gameService.shuffleWords();
    this.countdownConfig = {
      leftTime: this.gameService.roundDuration,
      format: 'mm:ss'
    };
  }

  fabPressed(newPlace: string[]) {
    newPlace.push(this.gameService.words.shift());
    if (this.skipButtonEnabled) {
      this.router.navigate(['/', 'remember']);
    }
  }

  handleCountdownEvent(event: CountdownEvent) {
    if (event.status === CountdownStatus.done) {
      this.skipButtonEnabled = true;
    }
  }

}
