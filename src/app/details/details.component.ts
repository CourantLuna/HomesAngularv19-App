import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../home/home.component';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms'; 
import { Location } from '@angular/common';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private location: Location)
  {
// Extraer el parámetro 'id' de la ruta.
    const housinLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housinLocationId).then(housinLocationId =>{
      this.housingLocation = housinLocationId;
    });
  }
  submitApplication(){

    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '', // ?? opera si el valor en el lado izquierdo es nulo | indefinido  ...
      this.applyForm.value.lastName ?? '', // entonces el valor de la derecha se usa
      this.applyForm.value.email ?? '',
    );

    // Limpiar los campos del formulario
    this.applyForm.reset();

  }

  goBack(): void {
    this.location.back();
  }
  photoError(event: any, str: string | undefined) {
    event.target.src = "https://placehold.co/600x400?text="+str?.replace(/ /g,"+");  // Imagen predeterminada
    }
}
