import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EnquiryService } from '../services/enquiry.service';

@Component({
  selector: 'app-enquiry',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="kicker">Admissions Enquiry</span>
        <h1>Tell us what you're looking for.</h1>
        <p>Fill in the form and our admissions team can contact you with course and admission guidance.</p>
      </div>
    </section>
    <section class="section">
      <div class="container enquiry-wrap">
        <div class="panel">
          <div class="success" *ngIf="submitted">
            ✓ Thank you! Your enquiry has been submitted successfully. We'll contact you shortly at {{ lastPhone }}.
          </div>
          <div class="error-message" *ngIf="errorMessage">
            ✗ {{ errorMessage }}
          </div>
          <form [formGroup]="form" (ngSubmit)="submit()" novalidate [style.opacity]="loading ? 0.6 : 1">
            <div class="form-grid">
              <div class="field">
                <label>Full Name *</label>
                <input formControlName="name" placeholder="Enter your full name" [disabled]="loading">
                <span class="error" *ngIf="form.controls['name'].touched && form.controls['name'].invalid">Please enter your name.</span>
              </div>
              <div class="field">
                <label>Mobile Number *</label>
                <input formControlName="phone" inputmode="tel" placeholder="10-digit mobile number" [disabled]="loading">
                <span class="error" *ngIf="form.controls['phone'].touched && form.controls['phone'].invalid">Please enter a valid 10-digit number.</span>
              </div>
              <div class="field">
                <label>Email Address</label>
                <input formControlName="email" type="email" placeholder="you@example.com" [disabled]="loading">
              </div>
              <div class="field">
                <label>Preferred Course *</label>
                <select formControlName="course" [disabled]="loading">
                  <option value="">Select a course</option>
                  <option *ngFor="let c of courses" [value]="c">{{ c }}</option>
                </select>
                <span class="error" *ngIf="form.controls['course'].touched && form.controls['course'].invalid">Please select a course.</span>
              </div>
              <div class="field">
                <label>City</label>
                <input formControlName="city" placeholder="Your city" [disabled]="loading">
              </div>
              <div class="field">
                <label>Qualification</label>
                <input formControlName="qualification" placeholder="e.g. 12th / Graduation" [disabled]="loading">
              </div>
              <div class="field full">
                <label>Your Message</label>
                <textarea formControlName="message" placeholder="Tell us what you would like to know..." [disabled]="loading"></textarea>
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px">
              <button type="submit" [disabled]="loading">{{ loading ? 'Sending...' : 'Submit Enquiry' }}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    .page-hero {
      background: linear-gradient(135deg, #06183b 0%, #0f2d5c 100%);
      color: #fff;
      padding: 50px 20px;
      text-align: center;
    }
    .page-hero .kicker {
      display: block;
      font-size: 0.9rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #f6b51c;
      margin-bottom: 10px;
    }
    .page-hero h1 {
      font-size: 2.2rem;
      margin: 0 0 15px;
      line-height: 1.3;
    }
    .page-hero p {
      max-width: 600px;
      margin: 0 auto;
      font-size: 1rem;
      opacity: 0.9;
    }
    .section {
      padding: 60px 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .enquiry-wrap {
      max-width: 700px;
      margin: 0 auto;
    }
    .panel {
      background: #fff;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }
    .success {
      background: #d4edda;
      color: #155724;
      padding: 15px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #28a745;
    }
    .error-message {
      background: #f8d7da;
      color: #721c24;
      padding: 15px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #dc3545;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    .field {
      display: flex;
      flex-direction: column;
    }
    .field.full {
      grid-column: 1 / -1;
    }
    label {
      margin-bottom: 8px;
      font-weight: 600;
      color: #06183b;
      font-size: 0.95rem;
    }
    input, select, textarea {
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: inherit;
      font-size: 1rem;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #06183b;
      box-shadow: 0 0 0 3px rgba(6, 24, 59, 0.1);
    }
    input:disabled, select:disabled, textarea:disabled {
      background: #f5f5f5;
      cursor: not-allowed;
    }
    textarea {
      resize: vertical;
      min-height: 120px;
    }
    .error {
      color: #dc3545;
      font-size: 0.85rem;
      margin-top: 5px;
    }
    button {
      background: #06183b;
      color: #fff;
      padding: 14px 40px;
      border: none;
      border-radius: 999px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    button:hover:not(:disabled) {
      background: #0a2547;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(6, 24, 59, 0.3);
    }
    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    @media (max-width: 600px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
      .panel {
        padding: 25px;
      }
      .page-hero h1 {
        font-size: 1.6rem;
      }
    }
  `]
})
export class EnquiryComponent implements OnInit {
  submitted = false;
  loading = false;
  errorMessage = '';
  lastPhone = '';
  courses = [
    'Polytechnic – Computer Science',
    'B.Tech – Computer Science',
    'BCA',
    'BBA',
    'MCA',
    'MBA'
  ];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private enquiryService: EnquiryService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ['', [Validators.email]],
      course: ['', Validators.required],
      city: [''],
      qualification: [''],
      message: ['']
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const formData = {
      ...this.form.value,
      submittedAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('css-group-enquiry', JSON.stringify(formData));

    // Send email via backend
    this.enquiryService.sendEnquiry(formData).subscribe({
      next: (response) => {
        this.loading = false;
        this.lastPhone = this.form.value.phone;
        this.submitted = true;
        this.form.reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          this.submitted = false;
        }, 5000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.error || 'Failed to send enquiry. Please try again.';
        console.error('Error sending enquiry:', error);

        // Clear error message after 5 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }
}
