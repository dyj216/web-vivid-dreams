import {Component, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-remember',
  templateUrl: './remember.component.html',
  styleUrls: ['./remember.component.scss']
})
export class RememberComponent implements OnInit {

  constructor(
    public gameService: GameService,
    private router: Router,
  ) {
    if (!this.gameService.setupComplete) {
      this.gameService.loadGame();
    }
  }

  ngOnInit() {
    if (!this.gameService.setupComplete) this.router.navigate(['/']);
  }

}
