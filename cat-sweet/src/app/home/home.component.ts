import { Component, OnInit } from '@angular/core';
import { CatService } from '../cat.service';  // Adjust the import path if needed

// Define the Cat interface here
interface Cat {
  CatID: number;
  Name: string;
  Breed: string;
  Age: string;
  Location: string;
  Image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cats: Cat[] = [];  // Specify cats as an array of Cat objects

  constructor(private catService: CatService) { }

  ngOnInit(): void {
    this.getCats();
  }

  // Fetch all cat profiles
  getCats(): void {
    this.catService.getCats().subscribe(
      (response: Cat[]) => {  // Specify the response type as an array of Cat objects
        this.cats = response;
      },
      (error: any) => {
        console.error('Error fetching cat profiles', error);
      }
    );
  }
}
