import WeatherCard from "./components/WeatherCard/WeatherCard";
export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-start p-6 bg-gradient-to-br from-blue-50 to-gray-100">
      <WeatherCard />
    </main>
  )
}

