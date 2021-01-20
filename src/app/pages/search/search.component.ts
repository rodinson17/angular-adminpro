import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from './../../models/user.model';
import { Hospital } from './../../models/hospital.model';
import { Doctor } from './../../models/doctor.model';

import { SearchesService } from './../../services/searches.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  listUsers: User[] = [];
  listHospitals: Hospital[] = [];
  listDoctors: Doctor[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private searchesService: SearchesService ) { }

  globalSearch( term: string ) {
    this.searchesService.globalSearch( term )
      .subscribe( ( resp: any ) => {
        console.log(resp)
        this.listUsers = resp.users;
        this.listHospitals = resp.hospitals;
        this.listDoctors = resp.doctors;
      })
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({ term }) => this.globalSearch( term ) );
  }

}
