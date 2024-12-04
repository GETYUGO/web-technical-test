import { z } from 'zod';

export const statusVehiclesSchema = z.enum(['AVAILABLE', 'MAINTENANCE', 'DISABLED'])

export const vehicleSchema = z.object({
  id: z.number(),
  plate_number: z.string(),
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  battery: z.number(),
  status: statusVehiclesSchema,
  booked: z.optional(z.object({
    socketId: z.string(),
  })),
})

export type Vehicle = z.infer<typeof vehicleSchema>
