import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { GameService } from './services/game.service';

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";
import { UsersListComponent } from "./views/admin/users-list/users-list.component";
import { GameComponent } from "./views/admin/game/game.component";


// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { GameNewComponent } from './views/admin/game-new/game-new.component';
import { CategoryComponent } from "./views/admin/category/category.component";
import { CategoryNewComponent } from "./views/admin/category-new/category-new.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "users", component: UsersListComponent },
      { path: "games", component: GameComponent },
      { path: "games/new", component: GameNewComponent},
      { path: "categories", component: CategoryComponent },
      { path: "categories/new", component: CategoryNewComponent},
      { path: "games/edit/:id", component: GameNewComponent},
      { path: "categories/edit/:id", component: CategoryNewComponent},
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" }
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", redirectTo: "auth/login",  pathMatch: "full" },
  { path: "**", redirectTo: "admin/dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
