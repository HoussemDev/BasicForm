import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  myForm: FormGroup;
  apiUrl = 'https://jsonplaceholder.typicode.com/comments'; // Mock API URL
  submissionResult: string | null = null;
  submittedData: any[] = []; // To store fetched data
  isTableVisible = false; // Control table visibility


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      body: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      this.http.post(this.apiUrl, this.myForm.value).subscribe(
        (response) => {
          console.log('Response from API:', response);
          this.submissionResult = 'Form submitted successfully!';
          this.isTableVisible = true; // Show the table after submission
          this.fetchData(); // Refresh the displayed data after submission
        },
        (error) => {
          console.error('Error from API:', error);
          this.submissionResult = 'Failed to submit the form. Try again later.';
        }
      );
    } else {
      console.warn('Form is invalid:', this.myForm);
      this.submissionResult = 'Form is invalid. Please fix errors.';
    }
  }


  fetchData(): void {
    // Add the limit query parameter to the API call to fetch only 10 records
    this.http.get<any[]>(`${this.apiUrl}?_limit=10`).subscribe(
      (data) => {
        console.log('Fetched data:', data);
        this.submittedData = data; // Populate the table with API data
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  ngOnInit(): void {
    this.fetchData(); // Fetch data when the component loads
  }
}
