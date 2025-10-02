import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location } = await req.json();
    console.log('Fetching weather for location:', location);

    // Demo weather data for different Kerala districts
    const weatherData: any = {
      "Thiruvananthapuram": {
        current: { temp: 32, humidity: 78, rainfall_chance: 65, condition: "Cloudy" },
        alerts: ["heavy_rain", "flood_risk"],
        forecast: [
          { date: "2025-10-03", high: 33, low: 25, rain: 70, condition: "Heavy Rain" },
          { date: "2025-10-04", high: 31, low: 24, rain: 80, condition: "Thunderstorm" },
          { date: "2025-10-05", high: 30, low: 23, rain: 40, condition: "Scattered Showers" }
        ]
      },
      "Kochi": {
        current: { temp: 31, humidity: 82, rainfall_chance: 55, condition: "Humid" },
        alerts: ["humidity_high"],
        forecast: [
          { date: "2025-10-03", high: 32, low: 26, rain: 50, condition: "Partly Cloudy" },
          { date: "2025-10-04", high: 33, low: 26, rain: 60, condition: "Rain Showers" },
          { date: "2025-10-05", high: 32, low: 25, rain: 45, condition: "Partly Cloudy" }
        ]
      },
      "Kozhikode": {
        current: { temp: 30, humidity: 75, rainfall_chance: 45, condition: "Partly Cloudy" },
        alerts: [],
        forecast: [
          { date: "2025-10-03", high: 31, low: 24, rain: 40, condition: "Mostly Sunny" },
          { date: "2025-10-04", high: 32, low: 25, rain: 35, condition: "Sunny" },
          { date: "2025-10-05", high: 33, low: 26, rain: 30, condition: "Sunny" }
        ]
      },
      "Thrissur": {
        current: { temp: 34, humidity: 70, rainfall_chance: 30, condition: "Sunny" },
        alerts: ["high_heat"],
        forecast: [
          { date: "2025-10-03", high: 35, low: 27, rain: 20, condition: "Hot & Sunny" },
          { date: "2025-10-04", high: 36, low: 28, rain: 15, condition: "Very Hot" },
          { date: "2025-10-05", high: 35, low: 27, rain: 25, condition: "Hot" }
        ]
      },
      "Palakkad": {
        current: { temp: 35, humidity: 65, rainfall_chance: 20, condition: "Very Hot" },
        alerts: ["heatwave", "drought_warning"],
        forecast: [
          { date: "2025-10-03", high: 37, low: 28, rain: 10, condition: "Extremely Hot" },
          { date: "2025-10-04", high: 38, low: 29, rain: 5, condition: "Heatwave" },
          { date: "2025-10-05", high: 36, low: 28, rain: 15, condition: "Very Hot" }
        ]
      },
      "Kannur": {
        current: { temp: 29, humidity: 80, rainfall_chance: 70, condition: "Rainy" },
        alerts: ["heavy_rain"],
        forecast: [
          { date: "2025-10-03", high: 30, low: 24, rain: 75, condition: "Heavy Rain" },
          { date: "2025-10-04", high: 29, low: 23, rain: 65, condition: "Rain" },
          { date: "2025-10-05", high: 30, low: 24, rain: 50, condition: "Showers" }
        ]
      },
      "Kollam": {
        current: { temp: 31, humidity: 76, rainfall_chance: 60, condition: "Cloudy" },
        alerts: ["flood_risk"],
        forecast: [
          { date: "2025-10-03", high: 32, low: 25, rain: 65, condition: "Rain" },
          { date: "2025-10-04", high: 31, low: 24, rain: 70, condition: "Heavy Showers" },
          { date: "2025-10-05", high: 30, low: 24, rain: 55, condition: "Showers" }
        ]
      },
      "Alappuzha": {
        current: { temp: 30, humidity: 85, rainfall_chance: 65, condition: "Humid & Cloudy" },
        alerts: ["humidity_high", "flood_risk"],
        forecast: [
          { date: "2025-10-03", high: 31, low: 25, rain: 70, condition: "Rain" },
          { date: "2025-10-04", high: 30, low: 24, rain: 75, condition: "Heavy Rain" },
          { date: "2025-10-05", high: 31, low: 25, rain: 60, condition: "Showers" }
        ]
      },
      "Kottayam": {
        current: { temp: 29, humidity: 77, rainfall_chance: 55, condition: "Pleasant" },
        alerts: [],
        forecast: [
          { date: "2025-10-03", high: 30, low: 23, rain: 50, condition: "Partly Cloudy" },
          { date: "2025-10-04", high: 31, low: 24, rain: 45, condition: "Mostly Sunny" },
          { date: "2025-10-05", high: 30, low: 23, rain: 55, condition: "Showers" }
        ]
      },
      "Idukki": {
        current: { temp: 24, humidity: 72, rainfall_chance: 50, condition: "Cool & Pleasant" },
        alerts: [],
        forecast: [
          { date: "2025-10-03", high: 26, low: 18, rain: 45, condition: "Partly Cloudy" },
          { date: "2025-10-04", high: 25, low: 17, rain: 60, condition: "Showers" },
          { date: "2025-10-05", high: 26, low: 18, rain: 40, condition: "Mostly Sunny" }
        ]
      },
      "Ernakulam": {
        current: { temp: 31, humidity: 80, rainfall_chance: 58, condition: "Humid" },
        alerts: ["humidity_high"],
        forecast: [
          { date: "2025-10-03", high: 32, low: 26, rain: 55, condition: "Partly Cloudy" },
          { date: "2025-10-04", high: 32, low: 25, rain: 60, condition: "Showers" },
          { date: "2025-10-05", high: 31, low: 25, rain: 50, condition: "Cloudy" }
        ]
      },
      "Malappuram": {
        current: { temp: 30, humidity: 74, rainfall_chance: 48, condition: "Pleasant" },
        alerts: [],
        forecast: [
          { date: "2025-10-03", high: 31, low: 24, rain: 45, condition: "Mostly Sunny" },
          { date: "2025-10-04", high: 32, low: 25, rain: 40, condition: "Sunny" },
          { date: "2025-10-05", high: 31, low: 24, rain: 50, condition: "Partly Cloudy" }
        ]
      },
      "Wayanad": {
        current: { temp: 26, humidity: 70, rainfall_chance: 52, condition: "Cool" },
        alerts: [],
        forecast: [
          { date: "2025-10-03", high: 27, low: 19, rain: 50, condition: "Partly Cloudy" },
          { date: "2025-10-04", high: 28, low: 20, rain: 45, condition: "Mostly Sunny" },
          { date: "2025-10-05", high: 27, low: 19, rain: 55, condition: "Showers" }
        ]
      },
      "Kasaragod": {
        current: { temp: 30, humidity: 79, rainfall_chance: 68, condition: "Humid & Rainy" },
        alerts: ["heavy_rain"],
        forecast: [
          { date: "2025-10-03", high: 31, low: 25, rain: 70, condition: "Rain" },
          { date: "2025-10-04", high: 30, low: 24, rain: 75, condition: "Heavy Rain" },
          { date: "2025-10-05", high: 30, low: 24, rain: 60, condition: "Showers" }
        ]
      }
    };

    const data = weatherData[location] || weatherData["Thiruvananthapuram"];

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in get-weather function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
