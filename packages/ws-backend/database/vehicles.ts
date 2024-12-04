import { type Config, adjectives, colors, uniqueNamesGenerator } from 'unique-names-generator';
import { getRandomPosition } from "../libs/position";
import { generateBatteryLevel, generateVehiclePlateNumber, getRandomStatus } from "../libs/vehicle";
import type { Vehicle } from "../types/vehicle";

const customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: ' ',
  length: 2,
};


/**
 * Generates random vehicles to simulate a real world scenario.
 * Serves as a mock database.
 */
export const vehicles: Vehicle[] = Array(1000).fill(null).map((_, index) => {
  const position = getRandomPosition();

  return {
    id: index,
    name: uniqueNamesGenerator(customConfig),
    plate_number: generateVehiclePlateNumber(),
    lat: position[1],
    lng: position[0],
    battery: generateBatteryLevel(),
    status: getRandomStatus(['DISABLED']),
  }
});

