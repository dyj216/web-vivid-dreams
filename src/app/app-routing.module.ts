import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { RulesComponent } from './rules/rules.component';


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
  { path: '',   redirectTo: '/rules', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
