'use client'
import { useState } from 'react';
import sendFormDetail from '../lib/api'

export default function Home() {
  const [formData, setFormData] = useState({
    tripStartDate: '',
    numTravelers: 1,
    fullName: '',
    email: '',
    dob: '',
    mobile: '',
    arrivalDate: '',
    departureDate: '',
    airportPickup: 'no',
    airportDropoff: 'no',
    insurance: 'full-coverage',
    paymentMethod: '', // Added paymentMethod to the state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await sendFormDetail(formData);
    
  };
  
  return (
    <div className="bg-gray-100">
      {/* Header Section */}
      <header className="bg-gray-900 text-white py-6">
        <h1 className="text-3xl text-center font-bold">Trekking Adventure Booking</h1>
      </header>

      {/* Trip Info Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Trip Info</h2>
          <p className="text-lg font-bold mb-4">Group discount available:</p>
          <ul className="list-none space-y-2 mb-6">
            <li>1 Pax - US$ 1190</li>
            <li>2 - 4 Pax - US$ 1090</li>
            <li>5 - 7 Pax - US$ 1020</li>
            <li>8 - 12 Pax - US$ 990</li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trip Start Date */}
            <div>
              <label htmlFor="trip-start" className="block text-sm font-medium text-gray-700">Trip Start Date*</label>
              <input
                type="date"
                id="trip-start"
                name="tripStartDate"  
                value={formData.tripStartDate}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />

            </div>

            {/* Number of Traveler */}
            <div>
              <label htmlFor="num-travelers" className="block text-sm font-medium text-gray-700">No of Traveller*</label>
              <input
                type="number"
                id="num-travelers"
                name="numTravelers"
                min="1"
                value={formData.numTravelers}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* Traveller Info Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Lead Traveller #1</h2>
          <p className="text-sm mb-4">This traveller will serve as the contact person for the booking.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name*</label>
              <input
                type="text"
                id="full-name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email / Nationality*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

          
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth / Passport No*</label>
              <input
                type="text"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

          
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number*</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flight Details Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Flight Details</h2>
          <p className="text-sm mb-4">Lead Traveller</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div>
              <label htmlFor="arrival-date" className="block text-sm font-medium text-gray-700">Arrival Date / Flight</label>
              <input
                type="text"
                id="arrival-date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            
            <div>
              <label htmlFor="airport-pickup" className="block text-sm font-medium text-gray-700">Airport Pickup</label>
              <select
                id="airport-pickup"
                name="airportPickup"
                value={formData.airportPickup}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

          
            <div>
              <label htmlFor="departure-date" className="block text-sm font-medium text-gray-700">Departure Date / Flight</label>
              <input
                type="text"
                id="departure-date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

          
            <div>
              <label htmlFor="airport-dropoff" className="block text-sm font-medium text-gray-700">Airport Dropoff</label>
              <select
                id="airport-dropoff"
                name="airportDropoff"
                value={formData.airportDropoff}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Insurance Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Travel Insurance</h2>
          <p className="text-sm mb-4">
            Please be advised that travel Insurance is mandatory when traveling with us. It is imperative that your policy covers both medical and emergency evacuation. Additionally, ensure that your insurance policy covers the highest elevation of your travel destination for your safety.
          </p>

          <div>
            <label htmlFor="insurance" className="block text-sm font-medium text-gray-700">Insurance Status*</label>
            <select
              id="insurance"
              name="insurance"
              value={formData.insurance}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="full-coverage">I have full coverage of Insurance</option>
              <option value="not-yet">Not yet bought (I will buy insurance later)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Booking Summary</h2>
          <ul className="list-none space-y-4 mb-6">
            <li>Trip Price: US$ 1190 x 1 = US$ 1190</li>
            <li>Deposit Amount (20%): US$ 238</li>
            <li>Bank Charge (3.5% Card Fee): US$ 8.33</li>
            <li>Deposit Payable Now: US$ 246.33</li>
          </ul>
          <p className="text-sm font-bold text-red-600">Note: For credit card payment, an extra 3.5% fee will be levied as a processing charge.</p>
        </div>
      </section>

      {/* Payment Method Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["visa", "mastercard", "amex", "discover", "jcb", "dinner-club", "union-pay"].map((method) => (
              <div className="flex items-center" key={method}>
                <input
                  type="radio"
                  id={method}
                  name="paymentMethod"  
                  value={method}
                  checked={formData.paymentMethod === method}  
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor={method}>{method.charAt(0).toUpperCase() + method.slice(1)}</label>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <button className='flex justify-center items-center p-5 bg-amber-500' onClick={handleSubmit}>
          Click Me
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>&copy; 2025 Trekking Adventure. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
