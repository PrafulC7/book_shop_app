import React, { useState} from 'react'
import useBookContext from '../contexts/BookContext';

const UserProfile = () => {
  const {addresses, setAddresses, name, setName, email, setEmail, phone, setPhone, orders} = useBookContext()
  const [isEditing, setIsEditing] = useState(false);
   const [activeTab, setActiveTab] = useState("profile");
  

  const handleAddressChange = (index, newValue) => {
    const updated = [...addresses];
    updated[index] = newValue;
    setAddresses(updated);
  };

  const addNewAddress = () => {
    setAddresses([...addresses, ""]);
  };

  const removeAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  return (

 <div style={{ width: "600px", margin: "30px auto" }}>
      <h2>User Profile</h2>

      {/* TAB BUTTONS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <button 
          onClick={() => setActiveTab("profile")}
          style={{
            padding: "10px",
            borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
            borderBottom: activeTab === "profile" ? "3px solid black" : "none",
            fontWeight: activeTab === "profile" ? "bold" : "normal",
            background: "none",
            cursor: "pointer"
          }}
        >
          Profile
        </button>

        <button 
          onClick={() => setActiveTab("orders")}
          style={{
            padding: "10px",
            borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
            borderBottom: activeTab === "orders" ? "3px solid black" : "none",
            fontWeight: activeTab === "orders" ? "bold" : "normal",
            background: "none",
            cursor: "pointer"
          }}
        >
          Orders
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "profile" && (
        <div>
          <h3>Your Profile</h3>
          <form onSubmit={handleSubmit}>
 <label>
           Name:{" "}
          {isEditing ? (
            <input
            className='form-control'
               value={name}
              onChange={(e) => setName(e.target.value)}
            />           ) : (
             <b>{name}</b>
          )}
         </label>
        <br />
         <label>
           Email:{" "}
           {isEditing ? (
             <input
             className='form-control'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
             />
           ) : (
             <b>{email}</b>
           )}
        </label>
         <br />
          <label>
           Phone:{" "}
           {isEditing ? (
             <input
             className='form-control'
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
             />
           ) : (
            <b>{phone}</b>
           )}
         </label>
         <br />
         <br />
          <label>
           {/* Address: */}
          {addresses.map((add, index) => (
             <div key={index} style={{ marginBottom: "8px" }}>
              {isEditing ? (
                 <div className='d-flex'>
                   <input
                   className='form-control'
                     value={add}
                     onChange={(e) =>
                       handleAddressChange(index, e.target.value)
                     }
                   />
                   <button
                     type="button"
                     onClick={() => removeAddress(index)}
                     style={{
                       marginLeft: "6px",
                       background: "red",
                       color: "white",
                       border: "none",
                       borderRadius: "4px",
                       cursor: "pointer",
                     }}
                   >
                     ✕
                   </button>
                 </div>
               ) : (
                 <div>
                   Address {index+1}: <b>{add}</b>
                 </div>
               )}
             </div>
           ))}
         </label>
         <br />
{isEditing && (
           <button
            type="button"
             onClick={addNewAddress}
             style={{
               marginBottom: "12px",
               background: "green",
               color: "white",
               border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
               cursor: "pointer",
             }}
           >
             + Add Address
           </button>
         )}
         <br />
         <button type="submit" className='btn btn-warning'>
           {isEditing ? "Save" : "Edit"} Profile
        </button>
          </form>
          
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          <h3>Your Orders</h3>
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            orders.map(order => (
              <div 
                key={order._id}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                  borderRadius: "6px"
                }}
              >
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Number of Items:</strong> {order.items.length}</p>
                <div><strong>Items:</strong> {order.items.map((item, index)=>(<div key={index}>{item.title}<img className='w-25 p-4' src={item.imgUrl}/>{item.quantity}Item ${item.price}</div>))}</div>
                {/* <p><strong>Items:</strong> {items}</p> */}
                <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
);
};


export default UserProfile;



