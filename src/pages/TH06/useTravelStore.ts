import { useState } from 'react';

export const useTravelStore = () => {
  const [destinations, setDestinations] = useState<any[]>([
    { id: '1', name: 'Phú Quốc', type: 'biển', price: 3000000, foodCost: 1500000, stayCost: 2000000, transportCost: 1000000, visitTime: 4 },
  ]);

  const [itinerary, setItinerary] = useState<any[]>([]);
  const [budgetLimit, setBudgetLimit] = useState<number>(5000000); 

  const addToPlan = (dest: any) => {
    setItinerary([...itinerary, { ...dest, planId: Date.now(), day: 1, travelTime: 1 }]);
  };

  const updateDay = (planId: number, day: number) => {
    setItinerary(prev => prev.map(i => i.planId === planId ? { ...i, day } : i));
  };

  const removeFromPlan = (planId: number) => {
    setItinerary(prev => prev.filter(i => i.planId !== planId));
  };

  return { destinations, itinerary, budgetLimit, setBudgetLimit, addToPlan, updateDay, removeFromPlan, setDestinations };
};