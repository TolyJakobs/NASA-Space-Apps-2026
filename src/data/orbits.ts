
export interface OrbitOption {
  id: string;
  name: string;
  altitudeKm: number;
  periodMinutes: number;
  sunlightFraction: number;
  contactModifier: number;
  scienceModifier: number;
  description: string;
}

export const orbits: OrbitOption[] = [
  {
    id: "low-earth-orbit",
    name: "Low Earth Orbit (LEO)",
    altitudeKm: 400,
    periodMinutes: 92,
    sunlightFraction: 0.6,
    contactModifier: 1.2,
    scienceModifier: 1.0,
    description:
      "A low-altitude orbit allows frequent passes over Earth and good opportunities for communication. It provides a useful balance between observation opportunities and sunlight exposure.",
  },
  {
    id: "mid-earth-orbit",
    name: "Medium Earth Orbit (MEO)",
    altitudeKm: 8000,
    periodMinutes: 288,
    sunlightFraction: 0.65,
    contactModifier: 0.9,
    scienceModifier: 0.85,
    description:
      "A higher orbit gives the satellite a wider view of Earth but generally reduces how frequently it passes over a particular ground station. It offers a different balance of coverage and communication.",
  },
  {
    id: "high-earth-orbit",
    name: "High Earth Orbit",
    altitudeKm: 20000,
    periodMinutes: 760,
    sunlightFraction: 0.7,
    contactModifier: 0.7,
    scienceModifier: 0.7,
    description:
      "A much higher orbit provides a broad view of Earth, but the satellite may have fewer useful close observation opportunities and less frequent ground-station contacts.",
  },
];

// These modifiers are simplified gameplay assumptions.
// They are not precise predictions of real orbital performance.
