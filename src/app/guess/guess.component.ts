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
  isLoadedGame = false;

  @ViewChild('cd') private countdown: CountdownComponent;

  constructor(
    public gameService: GameService,
    private router: Router,
  ) {
    if (!this.gameService.setupComplete) {
      this.gameService.loadGame();
      this.isLoadedGame = true;
    } else {
      this.isLoadedGame = false;
    }
  }

  ngOnInit() {
    if (!this.gameService.setupComplete) {
      this.router.navigate(['/']);
    }
    this.countdownConfig = {
      leftTime: this.isLoadedGame ? JSON.parse(this.gameService.getItem("timeLeft")) : this.gameService.roundDuration,
      format: 'mm:ss'
    };
  }

  fabPressed(newPlaceName: string, newPlace: string[]) {
    this.gameService.putCurrentWordAway(newPlaceName, newPlace);
    if (this.skipButtonEnabled) {
      this.router.navigate(['/', 'remember']);
    }
  }

  handleCountdownEvent(event: CountdownEvent) {
    if (event.action === "start") {
      let timeLeft = event.left / 1000;
      const timer = setInterval(function (gameService) {
        if (timeLeft <= 0) {
          clearInterval(timer);
          return;
        }
        timeLeft -= 1;
        gameService.setItem("timeLeft", timeLeft);
      }, 1000, this.gameService);
    }
    if (event.status === CountdownStatus.done) {
      this.skipButtonEnabled = true;
    }
  }
}
