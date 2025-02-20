import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const PostLoginPage = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('route');
  const navigate = useNavigate();

  // Simulating fetching bus data
  useEffect(() => {
    // Dummy bus data with more details
    const busData = [
      { id: 1, route: 'Route 1', busNumber: 'BUS123', type: 'Express', location: { lat: 12.9716, lng: 77.5946 }, status: 'On Time', estimatedArrival: '5 min' },
      { id: 2, route: 'Route 2', busNumber: 'BUS456', type: 'Normal', location: { lat: 12.9916, lng: 77.6046 }, status: 'Delayed', estimatedArrival: '15 min' },
      { id: 3, route: 'Route 3', busNumber: 'BUS789', type: 'Express', location: { lat: 12.9616, lng: 77.5846 }, status: 'On Time', estimatedArrival: '2 min' },
      { id: 4, route: 'Route 4', busNumber: 'BUS101', type: 'Normal', location: { lat: 12.9516, lng: 77.5746 }, status: 'On Time', estimatedArrival: '8 min' },
    ];
    setBuses(busData);
    setFilteredBuses(busData);
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterBuses(e.target.value, sortBy);
  };

  const filterBuses = (searchTerm, sortBy) => {
    let filtered = buses.filter((bus) =>
      bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortBy === 'status') {
      filtered = filtered.sort((a, b) => (a.status === 'On Time' ? -1 : 1));
    } else {
      filtered = filtered.sort((a, b) => a.route.localeCompare(b.route));
    }
    setFilteredBuses(filtered);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    filterBuses(searchTerm, e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
    <Navbar></Navbar>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-green-600">Welcome to the Bus Tracking App</h1>
        <button
          onClick={handleLogout}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </header>

      <section className="mb-6">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by route or bus number"
            value={searchTerm}
            onChange={handleSearch}
            className="p-3 border border-gray-300 rounded-md w-1/3"
          />
          <select
            onChange={handleSort}
            value={sortBy}
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="route">Sort by Route</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </section>

      <section className="bus-list">
        <h2 className="text-2xl font-semibold text-center mb-6">Live Bus Locations</h2>
        <ul className="space-y-4">
          {filteredBuses.map((bus) => (
            <li
              key={bus.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start"
            >
              <h3 className="text-xl font-bold">{bus.route} ({bus.busNumber})</h3>
              <p className="text-sm text-gray-600">Bus Type: {bus.type}</p>
              <p className="text-sm text-gray-600">Status: {bus.status}</p>
              <p className="text-sm text-gray-600">Estimated Arrival: {bus.estimatedArrival}</p>
              <p className="text-sm text-gray-600">
                Location: Lat {bus.location.lat}, Lng {bus.location.lng}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default PostLoginPage;
