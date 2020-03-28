import {Component, OnInit} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'app-remember',
  templateUrl: './remember.component.html',
  styleUrls: ['./remember.component.scss']
})
export class RememberComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit() {
  }

}
