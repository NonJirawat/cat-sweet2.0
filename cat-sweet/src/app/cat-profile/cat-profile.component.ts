import { Component, OnInit } from '@angular/core';
import { CatService } from '../cat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cat-profile',
  templateUrl: './cat-profile.component.html',
  styleUrls: ['./cat-profile.component.css']
})
export class CatProfileComponent implements OnInit {

  cats: any[] = [];
  selectedFile: File | null = null;

  constructor(private catService: CatService) { }

  ngOnInit(): void {
    this.getAllCats();
  }

  getAllCats(): void {
    this.catService.getCats().subscribe(
      (data) => {
        this.cats = data;
      },
      (error) => {
        Swal.fire('Error', 'Failed to fetch cat profiles', 'error');
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form: any): void {
    if (this.selectedFile && form.valid) {
      const formData = new FormData();
      formData.append('name', form.value.name);
      formData.append('breed', form.value.breed);
      formData.append('age', form.value.age);
      formData.append('location', form.value.location);
      formData.append('image', this.selectedFile);

      this.catService.addCat(formData).subscribe(
        () => {
          Swal.fire('Success', 'Cat profile added successfully', 'success');
          this.getAllCats();  // Refresh the cat list
        },
        (error) => {
          Swal.fire('Error', 'Failed to add cat profile', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Please fill in all fields and select an image', 'error');
    }
  }
}

