import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as mapboxgl from 'mapbox-gl';

import { environment } from 'src/environments/environment';
import { BoundariesService } from '../../services/boundaries.service';

@Component({
  selector: 'app-zipcode-boundary',
  templateUrl: './zipcode-boundary.component.html',
  styleUrls: ['./zipcode-boundary.component.scss']
})
export class ZipcodeBoundaryComponent implements OnInit {

  map: mapboxgl.Map;
  zipCode: FormControl = new FormControl('', [Validators.required]);
  zipCodeLoading: boolean;
  queryZipCode: string;
  boundaryGeoJson: any;

  private _snackBar = inject(MatSnackBar);

  @HostListener('window:resize', ['$event'])
    onResize() {
      this.fitMapToBoundaries();
    }
  constructor(private boundariesService: BoundariesService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['zipcode']) {
        this.queryZipCode = params['zipcode'];
        this.zipCode.setValue(params['zipcode']);
        this.getZipCodeBoundaries();
      }
    });
  }

  ngOnInit(): void {
    this.createMap();
    this.zipCode.valueChanges.subscribe(_ => this._snackBar?.dismiss());
  }

  createMap(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.MAPBOX_API_KEY,
      container: 'map',
      center: [2.2940, 48.8598],
      zoom: 15,
      pitch: 60,
    });
  }

  onSubmit(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { zipcode: this.zipCode.value },
      queryParamsHandling: 'merge'
    });
  }

  getZipCodeBoundaries(): void {
    if (!this.zipCode.value) {
      this.showError('Please enter a zip code.');
      return;
    }

    this.zipCodeLoading = true;

    this.boundariesService.getByZipCode(this.zipCode.value)
      .subscribe(boundaryGeoJson => {
        this.zipCodeLoading = false;
        this.boundaryGeoJson = boundaryGeoJson;

        if (!boundaryGeoJson.features.length || boundaryGeoJson.features[0].geometry.type !== 'Polygon') {
          this.showError('Invalid zip code, Please try again');
          return;
        }

        boundaryGeoJson.features.length > 1 || this.zipCode.value.includes(',')
          && this.showError('A list of zip codes are not supported, Showing first valid zip code.');

        this.map.getSource('boundary-source') && this.removeExistingLayaers();

        this.addBoundaryToMap(boundaryGeoJson);
      }
      ,error => {
        this.zipCodeLoading = false;
        this.showError(error.message);

        console.error('Error fetching boundary:', error);
      });
  }

  addBoundaryToMap(boundaryGeoJson: any): void {
    const source = `boundary-source`;

    this.map.addSource(source, {
      type: 'geojson',
      data: boundaryGeoJson.features[0],
    });

    this.map.addLayer({
      id: 'boundary-layer',
      type: 'fill',
      source,
      layout: {},
      paint: {
        'fill-color': '#484848',
        'fill-opacity': 0.5
      }
    });

    this.map.addLayer({
      id: 'boundary-layer-outline',
      type: 'line',
      source,
      layout: {},
      paint: {
        'line-color': '#484848',
        'line-width': 2
      }
    });

    this.fitMapToBoundaries();
  }

  private removeExistingLayaers(): void {
    this.map.removeLayer('boundary-layer');
    this.map.removeLayer('boundary-layer-outline')
    this.map.removeSource('boundary-source');
  }

  private showError(message: string) {
    this._snackBar.open(message, 'OK');
  }

  private fitMapToBoundaries(): void {
    const coordinates = this.boundaryGeoJson.features[0].geometry.coordinates[0];
    const bounds = coordinates.reduce((bounds: any, coord: any) => bounds.extend(coord), new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    this.map.fitBounds(bounds, {
      padding: 20
    });
  }

  get sameAsInQuery(): boolean {
    return this.zipCode.value === this.queryZipCode;
  }
}
