import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CONFIG } from "src/environments/environment";
import { Cours } from "../models/Cours";
import { Enseignant } from "../models/Enseignant";
import { Groupe } from "../models/Groupe";
import { Matiere } from "../models/Matiere";


@Injectable({
    providedIn: 'root'
})
export class EnseignantServiceSevice{
    constructor(private http: HttpClient) {}

    public GetAll(): Observable<Enseignant[]>{
        return this.http.get<Enseignant[]>(`${CONFIG.URL}enseignant/GetAll`) ;
    }

    public ajoutEnseignat(ens:Enseignant): Observable<string>{
        return this.http.post<string>(`${CONFIG.URL}enseignant/ajout`,ens) ;
    }

  public ModifierEnseignat(id: number, ens:Enseignant): Observable<string>{
      console.log(ens)
    return this.http.put<string>(`${CONFIG.URL}enseignant/modifierEns/`+id, ens) ;
  }

    public Modifiertype(Modifiertype:Enseignant): Observable<string>{
        return this.http.put<string>(`${CONFIG.URL}enseignant/Modifiertype`,Modifiertype) ;
    }

    public GetById(Id:number): Observable<Enseignant>{
        return this.http.get<Enseignant>(`${CONFIG.URL}enseignant/GetById/`+Id) ;
    }

    public getByType(getByType:Enseignant): Observable<Enseignant[]>{
        return this.http.get<Enseignant[]>(`${CONFIG.URL}enseignant/GetByType`) ;
    }

    public getByMatiere(getByMatiere:Enseignant): Observable<Enseignant[]>{
        return this.http.get<Enseignant[]>(`${CONFIG.URL}enseignant/GetByMatiere`) ;
    }

    public getByMatiereAndNiveau(getByMatiereAndNiveau:Enseignant): Observable<Enseignant[]>{
        return this.http.get<Enseignant[]>(`${CONFIG.URL}enseignant/GetByMatiereAndNiveau`) ;
    }

    public getCours(getCours:Enseignant): Observable<Cours[]>{
        return this.http.get<Cours[]>(`${CONFIG.URL}enseignant/GetCours`) ;
    }

    public getGroupes(getGroupes:Enseignant): Observable<Groupe[]>{
        return this.http.get<Groupe[]>(`${CONFIG.URL}enseignant/GetGroupes`) ;
    }

    public getMatieres(getMatieres:Enseignant): Observable<Matiere[]>{
        return this.http.get<Matiere[]>(`${CONFIG.URL}enseignant/GetMatieres`) ;
    }

    public getEnsByUser(id:number):Observable<Enseignant>{
        let params = new HttpParams();
        params = params.append("id",id);
        return this.http.get<Enseignant>(`${CONFIG.URL}enseignant/GetByUser1/`,{params:params});
      }

      public archiver(id:number):Observable<string>{
      return this.http.get<string>(`${CONFIG.URL}enseignant/archiver/`+id);
      }
}

