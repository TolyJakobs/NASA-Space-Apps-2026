
export interface Component {
  id: string; // Required: unique component ID.
  name: string; // Required: component name.
  type: string; // Required: component category.
  massKg: number; // Mass in kilograms.
  description?: string; // Optional description.
}

/** A payload that consumes power to collect mission science data. */
export interface ScientificInstrument extends Component {
  type: 'scientific-instrument';
  costUsd: number; // Cost in USD.
  powerConsumptionW: number; // Active power consumed in watts (W), not generated power.
  scienceDataMbPerDay: number; // Scientific data generated per day in MB/day.
  scienceTags: string[]; // Mission science categories supported by this instrument.
}

/** A component that generates nominal electrical power. */
export interface SolarPanel extends Component {
  type: 'solar-panel';
  costUsd: number; // Cost in USD.
  powerGenerationW: number; // Nominal power generated in watts (W), not stored energy in Wh.
}

/** A component that stores electrical energy for later use. */
export interface Battery extends Component {
  type: 'battery';
  capacityWh: number; // Stored electrical energy in watt-hours (Wh), not power in W.
  costUsd: number; // Cost in USD.
}

/** Equipment that consumes power while returning spacecraft data to the ground. */
export interface CommunicationEquipment extends Component {
  type: 'communications';
  costUsd: number; // Cost in USD.
  powerConsumptionW: number; // Active power consumed in watts (W).
  downlinkMbPerDay: number; // Simplified daily downlink capacity in MB/day.
}

export interface MissionDefinition {
  id: string; // Required: mission ID.
  name: string; // Required: mission name.
  description?: string; // Optional mission description.
  scienceTags: string[]; // Science categories required by the mission.
  budgetUsd: number; // Maximum gameplay budget in USD.
  targetScienceDataMbPerDay: number; // Required daily science data in MB/day.
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
  description: string;
  maxPayloadKg: number; // Maximum payload mass in kilograms.
  costUsd: number; // Illustrative launch cost in USD.
  supportedOrbitIds: string[]; // Orbit option IDs supported by this launch option.
}

export interface MissionConfiguration {
  missionId: string;
  // Each ID must resolve to a catalog component; repeated IDs represent multiple copies.
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
