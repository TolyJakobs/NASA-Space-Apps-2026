
export interface Battery {
  id: string;
  name: string;
  capacityWh: number;
  massKg: number;
  costUsd: number;
  description: string;
}

export const batteries: Battery[] = [
  {
    id: "small-battery",
    name: "Small Battery",
    capacityWh: 250,
    massKg: 2,
    costUsd: 500,
    description:
      "A lightweight and affordable battery with lower energy storage capacity.",
  },
  {
    id: "large-battery",
    name: "Large Battery",
    capacityWh: 500,
    massKg: 5,
    costUsd: 900,
    description:
      "A high-capacity battery that stores more energy but adds more mass and cost.",
  },
];

export const batteryTradeOffs = {
  "small-battery": {
    advantages: [
      "Lower mass",
      "Lower cost",
    ],
    disadvantages: [
      "Lower energy storage capacity",
    ],
  },

  "large-battery": {
    advantages: [
      "Higher energy storage capacity",
    ],
    disadvantages: [
      "Higher mass",
      "Higher cost",
    ],
  },
};
