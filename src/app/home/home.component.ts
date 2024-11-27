import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HousingService } from '../housing.service';
import { promise } from 'protractor';

export interface HousingLocation {
  id: number;
  name: string;
  city: string;
  state: string;
  photo: string;
  description: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent{
    housingLocationList: HousingLocation[] =[];
    filteredLocationList: HousingLocation[] =[];
    mensaje: string = '';

    housingService: HousingService = inject(HousingService);
   
    constructor()
    {
      this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) =>{
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      
      }); 
    }

    filterResults(text: string): void
    {

      if(!text) this.filteredLocationList = this.housingLocationList;

      this.filteredLocationList = this.housingLocationList.filter(
        housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      );
    }

    // Método que se llama cuando la imagen no se encuentra
  photoError(event: any) {
    event.target.src = 'https://via.placeholder.com/150';  // Imagen predeterminada
  }

}





