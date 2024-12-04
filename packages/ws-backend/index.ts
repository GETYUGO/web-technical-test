import { Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents } from './types/socket';
import { generateBatteryLevel, getRandomStatus } from './libs/vehicle';
import { getAllVehicles, updateVehicle } from './services/vehicles';
import { getRandomPosition } from './libs/position';

console.log('Starting server...');

const server = new Server<ClientToServerEvents, ServerToClientEvents>({
  cors: {
    origin: 'http://localhost:5173',
  }
});

server.on('connection', (socket) => {
  console.log('A client connected');

  socket.emit('vehicles', getAllVehicles());

  socket.on('vehicle', (vehicle) => {
    updateVehicle(vehicle.id, vehicle);
  });

  /**
   * Simulates real world scenario by updating one vehicle every 150ms.
   * It will update atrtibutes except the id and plate_number.
   */
  setInterval(() => {
    const vehicle = getAllVehicles().at(Math.floor(Math.random() * getAllVehicles().length));

    let updated = false;

    if (vehicle) {
      // Update the position of the vehicle in 15% of the cases.
      if (Math.random() >= 0.85) {
        const position = getRandomPosition();

        vehicle.lat = position[1];
        vehicle.lng = position[0];

        updated = true;
      }

      // Update the status of the vehicle in 50% of the cases.
      if (Math.random() >= 0.5) {
        vehicle.status = getRandomStatus();

        updated = true;
      }

      // Update the battery of the vehicle in 70% of the cases.
      if (Math.random() >= 0.3) {
        vehicle.battery = generateBatteryLevel(vehicle.battery);

        updated = true;
      }

      if (updated) {
        socket.emit('vehicle', vehicle);
      }
    }
  }, 100);

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

server.listen(3000);

console.log('Server started!');
