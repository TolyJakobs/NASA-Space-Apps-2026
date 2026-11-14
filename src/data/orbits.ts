
import type { OrbitOption } from "../domain/types";

export const orbits: OrbitOption[] = [
  {
    id: "low-earth-orbit",
    name: "Low Earth Orbit (LEO)",
    altitudeKm: 400,
    inclinationDeg: 51.6,
    periodMinutes: 92,
    sunlightFraction: 0.6,
    contactModifier: 1.2,
    scienceModifier: 1.0,
    description:
      "A low-altitude orbit provides frequent opportunities to observe Earth and communicate with ground stations. It offers a useful balance between observation opportunities and sunlight exposure.",
  },
  {
    id: "mid-earth-orbit",
    name: "Medium Earth Orbit (MEO)",
    altitudeKm: 8000,
    inclinationDeg: 45,
    periodMinutes: 288,
    sunlightFraction: 0.65,
    contactModifier: 0.9,
    scienceModifier: 0.85,
    description:
      "A higher orbit provides a wider view of Earth but changes ground coverage and communication opportunities. It offers a different balance of coverage and observation effectiveness.",
  },
  {
    id: "high-earth-orbit",
    name: "High Earth Orbit",
    altitudeKm: 20000,
    inclinationDeg: 30,
    periodMinutes: 760,
    sunlightFraction: 0.7,
    contactModifier: 0.7,
    scienceModifier: 0.7,
    description:
      "A much higher orbit provides a broad view of Earth but changes observation opportunities and ground-station contact patterns.",
  },
];

// All modifiers and sunlight fractions are simplified gameplay assumptions.
// Orbit values are illustrative and are not precise mission predictions.
