import { LatLngTuple } from 'leaflet';

export enum PaddlingService {
  "StandUpPaddle" = "Stand Up Paddle",
  "Kayak" = "Kayak",
}

export type PaddlingLocation = {
  position: LatLngTuple;
  name: string;
  logo: string;
  priceStart: number;
  service: PaddlingService[];
  whatsapp: string;
  direction: string;
  images: string[];
  place: string;
} 