import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  employeeForm: FormGroup;
  selectedData: any = {};
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: [''],
      email: [''],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    // this.onLoadData();
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: [''],
      experienceInYears: [''],
      proficiency: ['']
    });
  }

  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  onLoadData(): void {
    this.employeeForm.patchValue({
      fullName: 'Pragim Technologies',
      email: 'pragim@pragimtech.com',
      skills: {
        skillName: 'C#',
        experienceInYears: 5,
        proficiency: 'beginner'
      }
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
  }

}
