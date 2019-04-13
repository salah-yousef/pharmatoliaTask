import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit {
  brandsParameters: string = '';
  brands: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.brandsParameters = this.route.snapshot.paramMap.get('brand');
    this.dataService.getBrand(this.brandsParameters).subscribe((brand: any) => {
      this.brands = (brand.Results);
    }) 
  }

  onBack() :void{
    this.router.navigate(['/details']);
  }

}
