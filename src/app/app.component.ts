import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userForm: FormGroup;
  submitted = false;

  selectedFile: File | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private userservice: UserService) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.userForm.get('username');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }

  isFieldInvalid(field: string): boolean {
    const control = this.userForm.get(field);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files?.[0] ?? null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) return;

    const formData = new FormData();

    formData.append('username', this.userForm.value.username);
    formData.append('email', this.userForm.value.email);
    formData.append('password', this.userForm.value.password);

    if (this.selectedFile) {
      formData.append('photo_profil', this.selectedFile);
    }

    this.loading = true;

    this.userservice.createuser(formData).subscribe({
      next: (value) => {
        alert('user created successfully !');
        this.userForm.reset();
        this.submitted = false;
        this.selectedFile = null;
        this.loading = false;
      },
      error: (err) => {
        alert('Error : ' + err.error?.message);
        this.loading = false;
      },
    });
  }
}
