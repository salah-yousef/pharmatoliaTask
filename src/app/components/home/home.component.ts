import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import {  Router } from '@angular/router';

export interface UserData {
  Make_ID: number;
  Make_Name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['Make_ID', 'Make_Name'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private router: Router) {
  }
  
  ngOnInit() {
    let makes;
    this.dataService.getMakes().subscribe((data: any) => {
      makes = data.Results;
      this.dataSource = new MatTableDataSource(makes);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onMakeClick() {
    this.router.navigate(['details']);
  }
}

