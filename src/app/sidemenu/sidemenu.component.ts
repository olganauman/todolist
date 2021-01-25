import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {filter, map, shareReplay, tap} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  @ViewChild('drawer') menu: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private route: Router) {

  }

  ngOnInit(): void {
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(event => {
      this.menu.close();
      // console.log('event');
    });
  }

}
