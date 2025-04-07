'use client'
import { useState } from 'react';
import sendFormDetail from '../lib/api';

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
    paymentMethod: '', // Payment method state
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    if (!formData.tripStartDate) newErrors.tripStartDate = "Trip Start Date is required.";
    if (!formData.numTravelers || formData.numTravelers < 1) newErrors.numTravelers = "At least 1 traveler is required.";
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Valid Email is required.";
    if (!formData.dob) newErrors.dob = "Date of Birth / Passport No is required.";
    if (!formData.mobile || !phoneRegex.test(formData.mobile)) newErrors.mobile = "Valid Mobile Number is required.";
    if (!formData.insurance) newErrors.insurance = "Insurance selection is required.";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Please select a payment method."; // Validation for Payment Method
    if (!formData.arrivalDate) newErrors.arrivalDate = "Arrival Date is required."; // Validation for Arrival Date
    if (!formData.departureDate) newErrors.departureDate = "Departure Date is required."; // Validation for Departure Date
    if (formData.arrivalDate && formData.departureDate && new Date(formData.arrivalDate) >= new Date(formData.departureDate)) {
      newErrors.departureDate = "Departure Date must be after Arrival Date."; // Check that departure date is after arrival date
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await sendFormDetail(formData);
      alert("Form submitted successfully!");
    }
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
              {errors.tripStartDate && <p className="text-red-500 text-sm mt-1">{errors.tripStartDate}</p>}
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
              {errors.numTravelers && <p className="text-red-500 text-sm mt-1">{errors.numTravelers}</p>}
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
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
              {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
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
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
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
              <label htmlFor="arrival-date" className="block text-sm font-medium text-gray-700">Arrival Date / Flight*</label>
              <input
                type="text"
                id="arrival-date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.arrivalDate && <p className="text-red-500 text-sm mt-1">{errors.arrivalDate}</p>}
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
              <label htmlFor="departure-date" className="block text-sm font-medium text-gray-700">Departure Date / Flight*</label>
              <input
                type="text"
                id="departure-date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.departureDate && <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>}
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
            {errors.insurance && <p className="text-red-500 text-sm mt-1">{errors.insurance}</p>}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Booking Summary</h2>
          <ul className="list-none space-y-4 mb-6 text-lg">
            {/* Dynamic Pricing and Charges */}
            {(() => {
              const pax = parseInt(formData.numTravelers);
              let pricePerPerson = 1190;

              if (pax >= 2 && pax <= 4) pricePerPerson = 1090;
              else if (pax >= 5 && pax <= 7) pricePerPerson = 1020;
              else if (pax >= 8) pricePerPerson = 990;

              const totalPrice = pax * pricePerPerson;
              const deposit = totalPrice * 0.2;
              const bankCharge = deposit * 0.035;
              const depositPayableNow = (deposit + bankCharge).toFixed(2);

              return (
                <>
                  <li>Trip Price: US$ {pricePerPerson} x {pax} = US$ {totalPrice}</li>
                  <li>Deposit Amount (20%): US$ {deposit.toFixed(2)}</li>
                  <li>Bank Charge (3.5% Card Fee): US$ {bankCharge.toFixed(2)}</li>
                  <li className="font-semibold">Deposit Payable Now: US$ {depositPayableNow}</li>
                </>
              );
            })()}
          </ul>
          <p className="text-sm font-bold text-red-600">
            Note: For credit card payment, an extra 3.5% fee will be levied as a processing charge.
          </p>
        </div>
      </section>

      {/* Payment Method Section with Radio Buttons */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Payment Method*</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="visa"
                name="paymentMethod"
                value="visa"
                onChange={handleChange}
                checked={formData.paymentMethod === 'visa'}
                className="mr-2"
              />
              <label htmlFor="visa">Visa Card</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="mastercard"
                name="paymentMethod"
                value="mastercard"
                onChange={handleChange}
                checked={formData.paymentMethod === 'mastercard'}
                className="mr-2"
              />
              <label htmlFor="mastercard">Mastercard</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="amex"
                name="paymentMethod"
                value="amex"
                onChange={handleChange}
                checked={formData.paymentMethod === 'amex'}
                className="mr-2"
              />
              <label htmlFor="amex">American Express</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="discover"
                name="paymentMethod"
                value="discover"
                onChange={handleChange}
                checked={formData.paymentMethod === 'discover'}
                className="mr-2"
              />
              <label htmlFor="discover">Discover</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="jcb"
                name="paymentMethod"
                value="jcb"
                onChange={handleChange}
                checked={formData.paymentMethod === 'jcb'}
                className="mr-2"
              />
              <label htmlFor="jcb">JCB</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="dinner-club"
                name="paymentMethod"
                value="dinner-club"
                onChange={handleChange}
                checked={formData.paymentMethod === 'dinner-club'}
                className="mr-2"
              />
              <label htmlFor="dinner-club">Dinner Club</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="union-pay"
                name="paymentMethod"
                value="union-pay"
                onChange={handleChange}
                checked={formData.paymentMethod === 'union-pay'}
                className="mr-2"
              />
              <label htmlFor="union-pay">Union Pay</label>
            </div>
          </div>
          {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
        </div>
      </section>


      {/* Submit Button */}
      <section className="container mx-auto px-4 py-10 text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg font-semibold"
        >
          Submit Booking
        </button>
      </section>
    </div>
  );
}
