import React, { useState } from "react";
import RouteForm from "./components/RouteForm";
import RouteMap from "./components/RouteMap";

function App() {
  const [route, setRoute] = useState({ start: null, waypoints: [], end: null });

  const handleRouteChange = (start, waypoints, end) => {
    setRoute({ start, waypoints, end });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="bg-blue-500 text-white p-4 w-full text-center">
        <h1 className="text-2xl">散歩ルート作成アプリ</h1>
      </header>
      <main className="flex flex-col items-center mt-8 gap-y-8 mx-8">
        <RouteForm onRouteChange={handleRouteChange} />
        <div className="">
          <RouteMap
            start={route.start}
            waypoints={route.waypoints}
            end={route.end}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
