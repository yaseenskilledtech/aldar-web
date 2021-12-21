import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StratigyCard } from '../models/stratigy';
import { StratigyService } from '../services/stratigy.service';

@Component({
  selector: 'app-our-strategy',
  templateUrl: './our-strategy.component.html',
  styleUrls: ['./our-strategy.component.scss'],
})
export class OurStrategyComponent implements OnInit {
  stratigies$!: Observable<StratigyCard[]>;
  constructor(private stratigyService: StratigyService) {}

  ngOnInit(): void {
    this.stratigies$ = this.stratigyService.stratigies$;
  }
}
