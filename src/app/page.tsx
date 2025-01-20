import Image from "next/image";
import WeatherCard from "./components/WeatherCard/page";
export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-gray-100">
      <WeatherCard />
    </main>
  )
}

