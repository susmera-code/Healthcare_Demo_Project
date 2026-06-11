import React from "react";

export default function AddressFields({
  prefix = "",
  address,
  setAddress,
  city,
  setCity,
  stateValue,
  setStateValue,
  states = [],
  pincode,
  setPincode,
   hideState = false 
}) {
  return (
    <>
      {/* Address + City */}
      <div className="mb-3 d-flex position-relative text-start fs-14 gap-2 input-with-icon">
        <div className="w-50">
          <label className="fw-bold mb-1">Address</label>
          <div className="position-relative">
            <input
              id={`${prefix}address`}
              className="form-control placeholder-custom"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
            <i className="bi bi-geo-alt"></i>
          </div>
        </div>

        <div className="w-50">
          <label className="fw-bold mb-1">City</label>
          <div className="position-relative">
            <input
              id={`${prefix}city`}
              className="form-control placeholder-custom"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
            />
            <i className="bi bi-buildings"></i>
          </div>
        </div>
      </div>

      {/* State + Pincode */}
      <div className="mb-3 d-flex position-relative text-start fs-14 gap-2">
         {!hideState && (
        <div className="w-50">
          <label className="fw-bold mb-1">State</label>
          <select
            id={`${prefix}state`}
            className="form-select"
            value={stateValue}
            onChange={(e) => setStateValue(e.target.value)}
          >
            <option value="">Select</option>
            {states.map((st) => (
              <option key={st.name} value={st.name}>
                {st.name}
              </option>
            ))}
          </select>
        </div>)}

        <div className="w-50">
          <label className="fw-bold mb-1">Pincode</label>
          <input
            id={`${prefix}pincode`}
            className="form-control placeholder-custom"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pincode"
            maxLength="6"
          />
        </div>
      </div>
    </>
  );
}