import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {SidemenuComponent} from './sidemenu/sidemenu.component';
import {TaskEditorComponent} from './task-editor/task-editor.component';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {AboutComponent} from './about/about.component';
import {DndComponent} from './dnd/dnd.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '', component: TaskEditorComponent
  },
  {
    path: 'profile', component: ProfileSettingsComponent
  },
  {
    path: 'about', component: DndComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
