export interface Destination {
  id: string;
  name: string;
  type: 'biển' | 'núi' | 'thành phố';
  rating: number;
  price: number;
  img: string;
  description: string;
  visitTime: number;
  foodCost: number;
  stayCost: number;
  transportCost: number;
}

export interface PlanItem extends Destination {
  planId: number;
  day: number;
}