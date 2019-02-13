import { Vehicle } from "./vehicle";

export interface Planet {
    name: string,
    distance: number,
    isSelected: boolean,
    id: number,
    selectedVehicleId: number,
}