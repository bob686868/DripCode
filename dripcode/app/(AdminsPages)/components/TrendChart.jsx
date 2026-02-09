"use client";
// Add these to your imports
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Calendar } from "lucide-react"; // Added this import

// Sample small data for the day's volume
const hourlyVolume = [
  { h: 1, v: 20 }, { h: 2, v: 30 }, { h: 3, v: 25 }, 
  { h: 4, v: 60 }, { h: 5, v: 45 }, { h: 6, v: 80 }
];

// ... inside your component
const Chart=({order})=>{
    return(

        <div className="flex items-center gap-4">
  <div>
    <h1 className="text-3xl font-extrabold tracking-tight">Order #ACME-{order.id}</h1>
    <p className="text-neutral-500 flex items-center gap-2 mt-1">
      <Calendar className="w-4 h-4" /> {new Date(order.createdAt).toLocaleDateString()}
    </p>
  </div>
  
  {/* Mini Sparkline Chart */}
  <div className="hidden md:block w-24 h-10 opacity-50">
     <p className="text-[10px] uppercase text-neutral-600 font-bold mb-1">Daily Load</p>
     <ResponsiveContainer width="100%" height="100%">
        <LineChart data={hourlyVolume}>
          <Line type="monotone" dataKey="v" stroke="#525252" strokeWidth={2} dot={false} />
        </LineChart>
     </ResponsiveContainer>
  </div>
</div>
)
}
export default Chart