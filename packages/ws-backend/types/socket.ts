import type { Vehicle } from "./vehicle";

export interface ServerToClientEvents {
  vehicles: (vehicles: Vehicle[]) => void;
  vehicle: (vehicle: Vehicle) => void;
}

export interface ClientToServerEvents {
  vehicle: (vehicle: Omit<Vehicle, 'plate_number'>) => void;
  book: (vehicleId: number) => void;
  unbook: (vehicleId: number) => void;
}
