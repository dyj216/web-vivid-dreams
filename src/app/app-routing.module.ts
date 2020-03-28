import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { RulesComponent } from './rules/rules.component';
import { GuessComponent } from './guess/guess.component';
import { RememberComponent } from './remember/remember.component';
import { ScoreComponent } from './score/score.component';


const routes: Routes = [
  {
    path: 'rules',
    component: RulesComponent,
    data: { title: 'Rules' }
  },
  {
    path: 'game-setup',
    component: GameSetupComponent,
    data: { title: 'Game Setup' }
  },
  {
    path: 'guess',
    component: GuessComponent,
    data: { title: 'Guessing' }
  },
  {
    path: 'remember',
    component: RememberComponent,
    data: { title: 'Remembering' }
  },
  {
    path: 'score',
    component: ScoreComponent,
    data: { title: 'Score' }
  },
  { path: '',   redirectTo: '/rules', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
