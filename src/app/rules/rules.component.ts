import { Component, OnInit } from '@angular/core';

interface PlayerRoleCount {
  players: number,
  fairies: number,
  sandmen: number,
  bogeymen: number
}

const _PLAYER_ROLE_COUNT: PlayerRoleCount[] = [
  {players: 4, fairies: 1, bogeymen: 1, sandmen: 2},
  {players: 5, fairies: 2, bogeymen: 1, sandmen: 2},
  {players: 6, fairies: 3, bogeymen: 2, sandmen: 1},
  {players: 7, fairies: 3, bogeymen: 3, sandmen: 2},
  {players: 8, fairies: 4, bogeymen: 3, sandmen: 1},
  {players: 9, fairies: 4, bogeymen: 3, sandmen: 2},
  {players: 10, fairies: 5, bogeymen: 4, sandmen: 1}
];

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  displayedColumns: string[] = ['Players', 'Fairies', 'Bogeymen', 'Sandmen'];
  dataSource = _PLAYER_ROLE_COUNT;

  constructor() { }

  ngOnInit() {
  }

}
