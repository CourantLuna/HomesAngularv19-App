import { Injectable } from "@angular/core";
import { HousingLocation } from "./home/home.component";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  //el decorador @Injectable nos dice que otros componentes pueden solitiar instancia de este servicio
  providedIn: "root",
})
export class HousingService {
  url = "https://ft5xvw-3000.csb.app/locations";

  constructor() {}
  //asincronamente este metodo promete devolver array de HousingLocation
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url); //variable local data. establece valor de espera a recuperar, pasamos la url como argumento
    return (await data.json()) ?? []; //Convierte el cuerpo de la respuesta (que está en formato JSON) en un objeto o arreglo de JavaScript.
  }

  async getHousingLocationById(
    id: Number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    const formData = { firstName, lastName, email };

    // Mostrar datos en un alert en formato JSON
    alert(`Form Data:\n${JSON.stringify(formData, null, 2)}`);

    console.log(firstName, lastName, email);
  }
}
