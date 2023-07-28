import { Component } from '@angular/core';
import { ConsultaService } from 'src/app/servicios/consulta.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent {

  constructor(private servicio: ConsultaService) { }
  personas: any;
  editar=false
  idActualizar=null
  personaForm = new FormGroup({
    dni: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cohort: new FormControl('0'),
    status: new FormControl('activo'),
    gender: new FormControl('masculino'),
    address: new FormControl('abc123'),
    phone: new FormControl('000')
  });

  ngOnInit(): void {
    this.servicio.loadStudents().subscribe(
      (data) => {
        this.personas = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onSubmit() {
    console.log(this.personaForm.value);
    this.servicio.addStudent(this.personaForm.value).subscribe(
      (data) => {
        console.log(data);
        this.resetForm()
        this.ngOnInit()
      },
      (error) => {
        console.log(error);
      }
    )

  }
  onDelete(persona: any) {
    console.log(persona);
    var result = window.confirm("¿Está seguro que desea eliminar?");
    if (result) {

      this.servicio.removeStudent(persona.id).subscribe(
        (data) => {
          console.log(data);
          this.ngOnInit()
        },
        (error) => {
          console.log(error);
        }
      );
      
    }
  }
  onEdit(persona: any) {
    
    console.log(persona);
    this.editar=true
    this.idActualizar=persona.id
    this.personaForm.setValue({
      dni: persona.dni,
      lastName: persona.lastName,
      firstName: persona.firstName,
      email: persona.email,
      cohort: persona.cohort,
      status: persona.status,
      gender: persona.gender,
      address: persona.address,
      phone: persona.phone
    });
   /* this.servicio.getStudents(persona.id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );*/
  }
  resetForm(){
    this.personaForm.patchValue({
      dni: '',
      lastName: '',
      firstName: '',
      email: '',
    });
  }
  cancelar(){
    this.resetForm()
    this.editar=false
    this.idActualizar=null
  }
  actualizar(){
    console.log(this.personaForm.value);
    this.servicio.updateStudent(this.idActualizar,this.personaForm.value).subscribe(
      (data) => {
        console.log(data);
        this.resetForm()
        this.editar=false
        this.ngOnInit()
      },
      (error) => {
        console.log(error);
      }
    )

  }
  

}
