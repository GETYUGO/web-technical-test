import type { Vehicle } from "../types/vehicle";

/**
 * Generate a random vehicle plate number
 */
export const generateVehiclePlateNumber = () => (Math.random() + 1).toString(36).substring(7);

export const getRandomStatus = (blacklist?: Vehicle['status'][]): Vehicle['status'] => {
  const random = Math.random();

  if (random > 0.95 && !blacklist?.includes('DISABLED')) {
    return 'DISABLED';
  }

  if (random > 0.85 && !blacklist?.includes('MAINTENANCE')) {
    return 'MAINTENANCE';
  }

  if (random > 0.1 && !blacklist?.includes('AVAILABLE')) {
    return 'AVAILABLE';
  }

  return 'AVAILABLE';
}

export const generateBatteryLevel = (previousBatteryLevel?: number) => {
  if (previousBatteryLevel) {
    const battery = previousBatteryLevel + (Math.random() * 5 * (Math.random() < 0.5 ? -1 : 1));

    if (battery < 0) {
      return 0;
    }

    if (battery > 100) {
      return 100;
    }

    return battery;
  }

  return Math.random() * 100;
};