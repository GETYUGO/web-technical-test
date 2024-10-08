import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
import { ClientToServerEvents, ServerToClientEvents  } from "ws-backend/types/socket"
import { Vehicle } from "ws-backend/types/vehicle";

function App() {
  const socketClient = useRef(io('http://localhost:3000', {
    autoConnect: false,
  }) as Socket<ServerToClientEvents, ClientToServerEvents>);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const socket = socketClient.current;

    socket?.on('vehicle', (vehicle) => {
      // Feel free to change the data structure to fit your needs.
      setVehicles((prevVehicles) => {
        const vehicleIndex = prevVehicles.findIndex((v) => v.id === vehicle.id);

        if (vehicleIndex !== -1) {
          return [
            ...prevVehicles.slice(0, vehicleIndex),
            vehicle,
            ...prevVehicles.slice(vehicleIndex + 1),
          ];
        }

        return [
          ...prevVehicles,
          vehicle,
        ];
      });

    });

    socket?.on('vehicles', (vehicles) => {
      setVehicles(vehicles);
    });

    socket?.connect();

    return () => {
      socket?.off('vehicle');
      socket?.disconnect();
    }
  }, []);

  return <div>
    <h1>Yego Tiny</h1>
    <ul>
      {vehicles.map((vehicle) => (
        <li key={vehicle.id}>{vehicle.name + ' (' + vehicle.plate_number + ')' + ' - ' + vehicle.battery + '%'}</li>
      ))}
    </ul>
  </div>
}

export default App
