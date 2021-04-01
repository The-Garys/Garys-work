import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {  NAME } from '../services-list/mock-service';
import { HttpClient } from '@angular/common/http';
import { LocalService } from '../local.service';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../services/services.service';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.scss'],
  providers: [NgbRatingConfig],
})
export class UserServicesComponent implements OnInit {
  
  map:boolean = false;
  inp : string;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  services: any = [];
  username: string;
  list: any = NAME;
  data: any;
  backup: any = [];
  location: any = NAME;
  reviews: any = [];
  n: any = ""
  l: any = ""
  p: any = this.local.pick

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private http: HttpClient,
    private local: LocalService,
    private serviceList: ServicesService,
    private router: Router,
    config: NgbRatingConfig,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    config.max = 5;
    config.readonly = true;
  }
  role: string = this.local.role;
  ngOnInit(): void {

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
          this.zoom = 12;
        });
      });
    })
    
    console.log('dddddzsssadad', this.local.pick);
    this.list = NAME;
    this.services = [];
    this.list = [];
    this.getServices();
    this.getProfessions();
    this.getRating();
    
  }

  // Get Current Location Coordinates
  public setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  onInputChange() {
    console.log(this.inp);
    
  }


  onChooseloc(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


   onLocChange(event) {
     this.latitude = event.coords.lat;
     this.longitude = event.coords.lng;
     this.getAddress(this.latitude, this.longitude);
   }




  getServices() {

    this.serviceList.getServiceProviders().subscribe((data) => {
      console.log('are those sps ?? ===>', data);
      this.services = data;
      this.services = this.services.filter((el) => {
        return el.isBanned === false;
      });
      this.backup = data;
      this.dropVal(this.local.pick)
    });
  }
  getProfessions() {
    this.serviceList.getProfessions()
      .subscribe((data) => {
        this.list = data;
      });
  }
  getRating() {
    console.log(this.services);

    for (var i = 0; i < this.services.length; i++) {
      console.log(
        'hedhy kol post wahadhaaaaa ===+====+==+===>',
        this.services[i]
      );
      this.serviceList.getRating(this.services[i].email)
        .subscribe((data) => {
          this.reviews = data;
          var totalRate = 0;
          for (var j = 0; j < this.reviews.length; j++) {
            totalRate += this.reviews[j].rate;
          }
          this.services[i].rate = totalRate / this.reviews.length;
        });
    }
  } 
  goSvProfile(svMail) {
    localStorage.setItem('halimMail', svMail);
    this.router.navigateByUrl('/fisitor');
  }
  getVal(val) {
    console.log(val);
    this.n = val.toUpperCase();
    this.services = this.backup;
    var newArray = [];
    this.services.map((e) => {
      val = val.toUpperCase();
      var name = e.fullName.toUpperCase();
      var profession = e.profession.toUpperCase();
      var location = e.location.toUpperCase();
      if (name.includes(val) && profession.includes(this.p) && location.includes(this.l)) {
        newArray.push(e);
      }
    });
    this.services = newArray;
    console.log("dazdzad", val, this.services)
  }

  dropVal(val) {
    console.log(val)
    // console.log(val)
    if (val === "all") {
      this.services = this.backup;
      var newArr = [];
      this.services.map((e) => {
        var name = e.fullName.toUpperCase();
        var location = e.location.toUpperCase();
        if (name.includes(this.n) && location.includes(this.l)) {
          newArr.push(e);
        }
      });
      this.services = newArr;
    } else {
      this.p = val.toUpperCase();
      this.services = this.backup;

      var newArr = [];
      this.services.map((e) => {
        val = val.toUpperCase();
        var name = e.fullName.toUpperCase();
        var profession = e.profession.toUpperCase();
        var location = e.location.toUpperCase();
        if (name.includes(this.n) && profession.includes(val) && location.includes(this.l)) {
          newArr.push(e);
        }
      });
      this.services = newArr;

      console.log(val, this.services)
    }

  }
   

  viewMap() {
this.map = true;
  }

  dropLoc(val) {
    
    console.log(val);
    this.l = val.toUpperCase();
    this.services = this.backup;
    var newArray = [];
    
    this.services.map((e) => {
      val = val.toUpperCase();
      let reg = new RegExp(val, "s")
      var name = e.fullName.toUpperCase();
      var profession = e.profession.toUpperCase();
      var location = e.location.toUpperCase();
      


      if (name.includes(this.n) && profession.includes(this.p) && reg.test(location)) {
        newArray.push(e);
      }
    });
    this.services = newArray;
    console.log(val, this.services)
  }

}
