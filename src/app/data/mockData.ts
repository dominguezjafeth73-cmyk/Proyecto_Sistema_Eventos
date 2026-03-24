export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  venueType: 'estadio' | 'arena' | 'teatro' | 'abierto';
  stageName: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  category: string;
}

export interface Zone {
  id: string;
  eventId: string;
  nombreZona: string;
  nombreTipoBoleto: string;
  precio: number;
  cupoMaximo: number;
  vendidos: number;
  reservados: number;
  disponibles: number;
}

export const MOCK_EVENTS: Event[] = [
  {
    id: 'evt-1',
    name: 'Bad Bunny: World’s Hottest Tour',
    description: 'El artista global del momento llega con su gira más espectacular. No te pierdas esta noche histórica llena de energía, luces y todos sus grandes éxitos.',
    date: '2026-06-15',
    time: '20:00',
    venue: 'Estadio Nacional Chelato Uclés',
    venueType: 'estadio',
    stageName: 'Escenario Principal Sur',
    address: 'Barrio Morazán, Blvd. Suyapa',
    city: 'Tegucigalpa',
    country: 'Honduras',
    latitude: 14.0950,
    longitude: -87.1956,
    imageUrl: 'https://images.unsplash.com/photo-1614014929026-c542fbe555d1?auto=format&fit=crop&q=80',
    category: 'Reggaeton',
  },
  {
    id: 'evt-2',
    name: 'Coldplay: Music of the Spheres',
    description: 'La legendaria banda británica trae su espectacular y colorido show inmersivo. Una experiencia musical única enfocada en la sostenibilidad.',
    date: '2026-07-22',
    time: '21:00',
    venue: 'Estadio Olímpico Metropolitano',
    venueType: 'estadio',
    stageName: 'Escenario Central',
    address: '33 Calle Sur, San Pedro Sula',
    city: 'San Pedro Sula',
    country: 'Honduras',
    latitude: 15.4851,
    longitude: -88.0263,
    imageUrl: 'https://images.unsplash.com/photo-1772093982440-c1f621fb7e95?auto=format&fit=crop&q=80',
    category: 'Rock',
  },
  {
    id: 'evt-3',
    name: 'El Rey León: El Musical',
    description: 'La magia de Disney cobra vida en el escenario con impresionantes vestuarios, música inolvidable y actuaciones que te dejarán sin aliento.',
    date: '2026-08-10',
    time: '19:30',
    venue: 'Teatro Nacional Manuel Bonilla',
    venueType: 'teatro',
    stageName: 'Sala Principal',
    address: 'Barrio Abajo, Centro Histórico',
    city: 'Tegucigalpa',
    country: 'Honduras',
    latitude: 14.1064,
    longitude: -87.2078,
    imageUrl: 'https://images.unsplash.com/photo-1764762167194-bc3e97330121?auto=format&fit=crop&q=80',
    category: 'Teatro',
  },
  {
    id: 'evt-4',
    name: 'Tomorrowland Américas',
    description: 'El festival de música electrónica más icónico del mundo aterriza en la playa. Tres días de magia, DJs top mundiales y escenarios impresionantes.',
    date: '2026-09-05',
    endDate: '2026-09-07',
    time: '14:00',
    venue: 'Paseo de los Ceibeños',
    venueType: 'abierto',
    stageName: 'Mainstage',
    address: 'Zona Viva, Frente al mar',
    city: 'La Ceiba',
    country: 'Honduras',
    latitude: 15.7835,
    longitude: -86.7942,
    imageUrl: 'https://images.unsplash.com/photo-1575045663365-6d561e059e60?auto=format&fit=crop&q=80',
    category: 'Electrónica',
  },
  {
    id: 'evt-5',
    name: 'Clásico Nacional: Olimpia vs Motagua',
    description: 'El derbi capitalino más esperado del año. Pasión, goles y la mejor afición en un partido que definirá al líder del torneo.',
    date: '2026-10-12',
    time: '16:00',
    venue: 'Estadio Nacional Chelato Uclés',
    venueType: 'estadio',
    stageName: 'Cancha Principal',
    address: 'Barrio Morazán, Blvd. Suyapa',
    city: 'Tegucigalpa',
    country: 'Honduras',
    latitude: 14.0950,
    longitude: -87.1956,
    imageUrl: 'https://images.unsplash.com/photo-1660462499851-0a6d9ba77a4b?auto=format&fit=crop&q=80',
    category: 'Deportes',
  }
];

export const MOCK_ZONES: Zone[] = [
  // Evento 1 - Estadio (Bad Bunny)
  { id: 'z1-1', eventId: 'evt-1', nombreZona: 'Playa VIP (Frente al Escenario)', nombreTipoBoleto: 'VIP Standing', precio: 5500, cupoMaximo: 2000, vendidos: 1950, reservados: 30, disponibles: 20 },
  { id: 'z1-2', eventId: 'evt-1', nombreZona: 'Silla VIP', nombreTipoBoleto: 'Asiento Numerado', precio: 3800, cupoMaximo: 3000, vendidos: 2800, reservados: 100, disponibles: 100 },
  { id: 'z1-3', eventId: 'evt-1', nombreZona: 'Sombra Sur', nombreTipoBoleto: 'Grada', precio: 1500, cupoMaximo: 5000, vendidos: 4500, reservados: 200, disponibles: 300 },
  { id: 'z1-4', eventId: 'evt-1', nombreZona: 'Sol Centro', nombreTipoBoleto: 'Grada General', precio: 800, cupoMaximo: 10000, vendidos: 10000, reservados: 0, disponibles: 0 },

  // Evento 2 - Estadio (Coldplay SPS)
  { id: 'z2-1', eventId: 'evt-2', nombreZona: 'Infinity VIP', nombreTipoBoleto: 'VIP Experience', precio: 6200, cupoMaximo: 1500, vendidos: 1490, reservados: 5, disponibles: 5 },
  { id: 'z2-2', eventId: 'evt-2', nombreZona: 'Cancha General', nombreTipoBoleto: 'Standing', precio: 2200, cupoMaximo: 8000, vendidos: 6000, reservados: 500, disponibles: 1500 },
  { id: 'z2-3', eventId: 'evt-2', nombreZona: 'Silla Preferencial', nombreTipoBoleto: 'Asiento', precio: 3000, cupoMaximo: 4000, vendidos: 3800, reservados: 100, disponibles: 100 },
  { id: 'z2-4', eventId: 'evt-2', nombreZona: 'Tendidos (Sol)', nombreTipoBoleto: 'Grada', precio: 900, cupoMaximo: 12000, vendidos: 11000, reservados: 200, disponibles: 800 },

  // Evento 3 - Teatro (El Rey Leon)
  { id: 'z3-1', eventId: 'evt-3', nombreZona: 'Platea Baja Centro', nombreTipoBoleto: 'Premium', precio: 1800, cupoMaximo: 200, vendidos: 180, reservados: 10, disponibles: 10 },
  { id: 'z3-2', eventId: 'evt-3', nombreZona: 'Platea Baja Lateral', nombreTipoBoleto: 'Preferencial', precio: 1400, cupoMaximo: 300, vendidos: 250, reservados: 20, disponibles: 30 },
  { id: 'z3-3', eventId: 'evt-3', nombreZona: 'Balcón', nombreTipoBoleto: 'General', precio: 800, cupoMaximo: 400, vendidos: 400, reservados: 0, disponibles: 0 },

  // Evento 4 - Abierto (Tomorrowland)
  { id: 'z4-1', eventId: 'evt-4', nombreZona: 'Comfort VIP Deck', nombreTipoBoleto: 'VIP 3 Días', precio: 8500, cupoMaximo: 1000, vendidos: 800, reservados: 50, disponibles: 150 },
  { id: 'z4-2', eventId: 'evt-4', nombreZona: 'General Admission', nombreTipoBoleto: 'Pase 3 Días', precio: 3500, cupoMaximo: 15000, vendidos: 12000, reservados: 1000, disponibles: 2000 },
  { id: 'z4-3', eventId: 'evt-4', nombreZona: 'Day Pass (Sábado)', nombreTipoBoleto: 'Pase 1 Día', precio: 1800, cupoMaximo: 5000, vendidos: 4500, reservados: 200, disponibles: 300 },

  // Evento 5 - Estadio (Deportes)
  { id: 'z5-1', eventId: 'evt-5', nombreZona: 'Palco', nombreTipoBoleto: 'VIP', precio: 1200, cupoMaximo: 300, vendidos: 250, reservados: 10, disponibles: 40 },
  { id: 'z5-2', eventId: 'evt-5', nombreZona: 'Silla', nombreTipoBoleto: 'Numerado', precio: 600, cupoMaximo: 2000, vendidos: 1800, reservados: 100, disponibles: 100 },
  { id: 'z5-3', eventId: 'evt-5', nombreZona: 'Sombra', nombreTipoBoleto: 'General', precio: 300, cupoMaximo: 5000, vendidos: 4000, reservados: 200, disponibles: 800 },
  { id: 'z5-4', eventId: 'evt-5', nombreZona: 'Sol Sur (Local)', nombreTipoBoleto: 'Popular', precio: 150, cupoMaximo: 8000, vendidos: 7800, reservados: 100, disponibles: 100 },
  { id: 'z5-5', eventId: 'evt-5', nombreZona: 'Sol Norte (Visita)', nombreTipoBoleto: 'Popular', precio: 150, cupoMaximo: 4000, vendidos: 2000, reservados: 50, disponibles: 1950 },
];
