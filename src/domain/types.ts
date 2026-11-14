
export interface Component {
  id: string; // Required: unique component ID.
  name: string; // Required: component name.
  type: string; // Required: component category.
  massKg: number; // Mass in kilograms.
  description?: string; // Optional description.
}

export interface MissionDefinition {
  id: string; // Required: mission ID.
  name: string; // Required: mission name.
  description?: string; // Optional mission description.
  componentIds: string[]; // IDs of available components.
  orbitIds: string[]; // IDs of available orbits.
  launchOptionIds: string[]; // IDs of launch options.
}


export interface OrbitOption {
  id: string;
  name: string;
  altitudeKm: number; // Orbit altitude in kilometers.
  inclinationDeg: number; // Orbit inclination in degrees.
  periodMinutes: number; // Time for one complete orbit.
  sunlightFraction: number; // Fraction of modeled time in sunlight (0-1).
  contactModifier: number; // Simplified communication gameplay multiplier.
  scienceModifier: number; // Simplified science gameplay multiplier.
  description: string; // Educational explanation of the orbit.
}



export interface LaunchOption {
  id: string;
  name: string;
  vehicleName: string;
  maxPayloadKg: number; // Maximum payload mass in kilograms.
  cost?: number; // Optional cost; currency must be agreed upon.
}

export interface MissionConfiguration {
  missionId: string;
  selectedComponentIds: string[];
  selectedOrbitId: string;
  selectedLaunchOptionId: string;
}

export interface ResourceSummary {
  totalMassKg: number; // Total mass in kilograms.
  powerAvailableW: number; // Power in watts (W).
  energyAvailableWh: number; // Energy in watt-hours (Wh).
  fuelAvailableKg: number; // Fuel mass in kilograms.
}

export interface ValidationIssue {
  code: string;
  message: string;
  severity: "error" | "warning";
  field?: string; // Optional field associated with the issue.
}

export interface SimulationResult {
  success: boolean;
  // true = simulation succeeded.
  // false = simulation failed.

  message: string; // Explanation of the result.
  durationSeconds?: number; // Optional simulation duration.
  resourceSummary?: ResourceSummary; // Optional resource results.
  issues: ValidationIssue[]; // Validation errors or warnings.
}
