import React, { useState, useEffect } from "react";

function RouteForm({ onRouteChange }) {
  const [duration, setDuration] = useState(30);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (position) {
      // ランダムルート生成ロジック（仮）
      const waypoints = generateRandomWaypoints(position, duration);
      onRouteChange(position, waypoints, position);
    }
  };

  const generateRandomWaypoints = (start, duration) => {
    const distancePerMinute = 0.08; // 1分あたり約0.08km (歩行速度約4.8km/h)
    const totalDistance = (duration / 60) * 4.8; // 散歩の総距離（km）
    const waypointsCount = 3; // ランダムなウェイポイントの数
    let waypoints = [];

    for (let i = 0; i < waypointsCount; i++) {
      const randomLat =
        start.lat + (Math.random() - 0.5) * totalDistance * 0.01;
      const randomLng =
        start.lng + (Math.random() - 0.5) * totalDistance * 0.01;
      waypoints.push({ location: { lat: randomLat, lng: randomLng } });
    }

    return waypoints;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-80"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="duration"
        >
          散歩時間（分）
        </label>
        <input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        ルート生成
      </button>
    </form>
  );
}

export default RouteForm;
