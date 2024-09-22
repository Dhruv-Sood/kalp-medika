'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Minus, Thermometer, Activity, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import HyperText from './magicui/hyper-text'
import NumberTicker from "@/components/magicui/number-ticker";
import BlurFade from './magicui/blur-fade'

// Dummy data for medicines
const initialMedicines = [
  {
    id: 1,
    name: "Paracetamol",
    idealTemp: "15-25°C",
    shelfLife: "36 months",
    dosage: "500-1000mg",
    quantity: 0,
  },
  {
    id: 2,
    name: "Amoxicillin",
    idealTemp: "20-25°C",
    shelfLife: "24 months",
    dosage: "250-500mg",
    quantity: 0,
  },
  {
    id: 3,
    name: "Ibuprofen",
    idealTemp: "20-25°C",
    shelfLife: "36 months",
    dosage: "200-400mg",
    quantity: 0,
  },
  {
    id: 4,
    name: "Aspirin",
    idealTemp: "15-30°C",
    shelfLife: "24 months",
    dosage: "75-300mg",
    quantity: 0,
  },
]

export function MedicineDashboardJsx() {
  const [medicines, setMedicines] = useState(initialMedicines)

  const fetchMedicineQuantities = async () => {
    const updatedMedicines = [...medicines]; // Clone the current medicines

    await Promise.all(updatedMedicines.map(async (medicine, index) => {
      try {
        const response = await axios.post(
          'https://gateway-api.kalp.studio/v1/contract/kalp/query/tzju9P38ZWM95eG02L8fg6wRbU9LSYIf1726930764602/ClientAccountBalance',
          {
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: "9f487977475be2bfc7125b1b50d6a42325196007",
            args: {
              id: medicine.id
            }
          },
          {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY
            }
          }
        );

        console.log(`Response for ID ${medicine.id}:`, response.data);

        const quantity = Number(response.data.result?.result); // Use optional chaining and convert to number

        updatedMedicines[index] = { ...medicine, quantity: !isNaN(quantity) ? quantity : 0 }; // Default to 0 if NaN
      } catch (error) {
        console.error(`Error fetching data for medicine ID ${medicine.id}:`, error);
        updatedMedicines[index] = { ...medicine, quantity: 0 }; // Default to 0 if there's an error
      }
    }));

    setMedicines(updatedMedicines); // Update state with new quantities
  };

  useEffect(() => {
    fetchMedicineQuantities();
  }, []);

  const handleMint = async (id) => {
    try {
      const response = await axios.post(
        'https://gateway-api.kalp.studio/v1/contract/kalp/invoke/tzju9P38ZWM95eG02L8fg6wRbU9LSYIf1726930764602/Mint',
        {
          network: "TESTNET",
          blockchain: "KALP",
          walletAddress: "9f487977475be2bfc7125b1b50d6a42325196007",
          args: {
            account: "9f487977475be2bfc7125b1b50d6a42325196007",
            id: id,
            amount: 1 // Minting 1 unit
          }
        },
        {
          headers: {
            'x-api-key': '6ba07d243d27e9734e9518ffe952a5356aab3b9400ebb432da2271fef8ee741525eb02d208780a6f8897a577038192c13ffa78d81cf46e442eec758d51c66134bb6003'
          }
        }
      );

      console.log('Mint response:', response.data);
      alert(`Mint successful for medicine ID: ${id}`);
      fetchMedicineQuantities(); // Re-fetch quantities after minting
    } catch (error) {
      console.error(`Error minting for medicine ID ${id}:`, error);
      alert(`Minting failed for medicine ID: ${id}. Please try again.`);
    }
  };

  const handleBurn = (id) => {
    // Implement burn logic
  }

  return (
    <div className="container mx-auto p-4 relative my-8">
      <HyperText className="text-4xl md:text-5xl font-bold text-center" text={"Medicine Supplies Dashboard"} />
      <BlurFade delay={0.25} inView>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 z-50">
        {medicines.map(medicine => (
          <Card key={medicine.id}>
            <CardHeader>
              <CardTitle>{medicine.name}</CardTitle>
              <CardDescription>Current Stock: <NumberTicker value={medicine.quantity} /></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Thermometer className="mr-2 h-4 w-4" />
                  <span>Ideal Temp: {medicine.idealTemp}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Shelf Life: {medicine.shelfLife}</span>
                </div>
                <div className="flex items-center">
                  <Activity className="mr-2 h-4 w-4" />
                  <span>Dosage: {medicine.dosage}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleBurn(medicine.id)}>
                <Minus className="mr-2 h-4 w-4" /> Burn
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleMint(medicine.id)}>
                <Plus className="mr-2 h-4 w-4" /> Mint
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      </BlurFade>
    </div>
  );
}
