import React, { useState} from 'react'
import useBookContext from '../contexts/BookContext';

const UserProfile = () => {
  const {addresses, setAddresses, name, setName, email, setEmail, phone, setPhone, orders, orderLoading} = useBookContext()
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

  const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
  minute: "2-digit",
  });
// bg-danger text-center
  return (
<div className='container text-center'>
 <div>
      <h2>User Profile</h2>

      {/* TAB BUTTONS */}
      <div>
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
                {orderLoading?(<h5 className='text-center mt-5'>Loading...</h5>):(
                  <div>
                  <h3>Recent Orders</h3>
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <div className='row bg-danger pb-5'>
            {[...orders].reverse().map(order => (
<div  key={order._id} className='col-sm-12 col-md-6 col-lg-4 my-2 d-flex'>
              <div className='card h-100 w-100'>
                <div className='card-body'>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                <p><strong>Number of Products:</strong> {order.items.length}</p>
                <div><strong>Items:</strong> {order.items.map((item, index)=>(<div key={index}>{item.title}<img className='w-25 p-4' src={item.imgUrl}/><strong>({item.quantity} {item.quantity > 1 ? "items" : "item"})</strong> of price <strong>${item.price}</strong> each</div>))}</div>
                {/* <p><strong>Items:</strong> {items}</p> */}
                <p><strong>Amount:</strong> ${order.totalAmount}</p>
              </div>
              </div>
              </div>
            ))}
            </div>
          )}
                  </div>
                )}

        </div>
      )}
    </div>
    </div>
);
};


export default UserProfile;

//  return (
// <div className='container'>
//  <div style={{ width: "600px", margin: "30px auto" }}>
//       <h2>User Profile</h2>

//       {/* TAB BUTTONS */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
//         <button 
//           onClick={() => setActiveTab("profile")}
//           style={{
//             padding: "10px",
//             borderTop: "none",
//     borderLeft: "none",
//     borderRight: "none",
//             borderBottom: activeTab === "profile" ? "3px solid black" : "none",
//             fontWeight: activeTab === "profile" ? "bold" : "normal",
//             background: "none",
//             cursor: "pointer"
//           }}
//         >
//           Profile
//         </button>

//         <button 
//           onClick={() => setActiveTab("orders")}
//           style={{
//             padding: "10px",
//             borderTop: "none",
//     borderLeft: "none",
//     borderRight: "none",
//             borderBottom: activeTab === "orders" ? "3px solid black" : "none",
//             fontWeight: activeTab === "orders" ? "bold" : "normal",
//             background: "none",
//             cursor: "pointer"
//           }}
//         >
//           Orders
//         </button>
//       </div>

//       {/* TAB CONTENT */}
//       {activeTab === "profile" && (
//         <div>
//           <h3>Your Profile</h3>
//           <form onSubmit={handleSubmit}>
//  <label>
//            Name:{" "}
//           {isEditing ? (
//             <input
//             className='form-control'
//                value={name}
//               onChange={(e) => setName(e.target.value)}
//             />           ) : (
//              <b>{name}</b>
//           )}
//          </label>
//         <br />
//          <label>
//            Email:{" "}
//            {isEditing ? (
//              <input
//              className='form-control'
//                value={email}
//                onChange={(e) => setEmail(e.target.value)}
//              />
//            ) : (
//              <b>{email}</b>
//            )}
//         </label>
//          <br />
//           <label>
//            Phone:{" "}
//            {isEditing ? (
//              <input
//              className='form-control'
//                value={phone}
//                onChange={(e) => setPhone(e.target.value)}
//              />
//            ) : (
//             <b>{phone}</b>
//            )}
//          </label>
//          <br />
//          <br />
//           <label>
//            {/* Address: */}
//           {addresses.map((add, index) => (
//              <div key={index} style={{ marginBottom: "8px" }}>
//               {isEditing ? (
//                  <div className='d-flex'>
//                    <input
//                    className='form-control'
//                      value={add}
//                      onChange={(e) =>
//                        handleAddressChange(index, e.target.value)
//                      }
//                    />
//                    <button
//                      type="button"
//                      onClick={() => removeAddress(index)}
//                      style={{
//                        marginLeft: "6px",
//                        background: "red",
//                        color: "white",
//                        border: "none",
//                        borderRadius: "4px",
//                        cursor: "pointer",
//                      }}
//                    >
//                      ✕
//                    </button>
//                  </div>
//                ) : (
//                  <div>
//                    Address {index+1}: <b>{add}</b>
//                  </div>
//                )}
//              </div>
//            ))}
//          </label>
//          <br />
// {isEditing && (
//            <button
//             type="button"
//              onClick={addNewAddress}
//              style={{
//                marginBottom: "12px",
//                background: "green",
//                color: "white",
//                border: "none",
//               borderRadius: "4px",
//               padding: "4px 8px",
//                cursor: "pointer",
//              }}
//            >
//              + Add Address
//            </button>
//          )}
//          <br />
//          <button type="submit" className='btn btn-warning'>
//            {isEditing ? "Save" : "Edit"} Profile
//         </button>
//           </form>
          
//         </div>
//       )}

//       {activeTab === "orders" && (
//         <div>
//                 {orderLoading?(<h5 className='text-center mt-5'>Loading...</h5>):(
//                   <div>
//                   <h3>Recent Orders</h3>
//           {orders.length === 0 ? (
//             <p>No orders available.</p>
//           ) : (
//             <div className='pb-5'>
//             {[...orders].reverse().map(order => (
//               <div className='card w-75 mb-2'
//                 key={order._id}
//                 // style={{
//                 //   padding: "10px",
//                 //   border: "1px solid #ccc",
//                 //   marginBottom: "10px",
//                 //   borderRadius: "6px",
//                 //   backgroundColor: "red"
//                 // }}
//               >
//                 <div className='card-body'>
//                 <p><strong>Order ID:</strong> {order._id}</p>
//                 <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
//                 <p><strong>Number of Products:</strong> {order.items.length}</p>
//                 <div><strong>Items:</strong> {order.items.map((item, index)=>(<div key={index}>{item.title}<img className='w-25 p-4' src={item.imgUrl}/><strong>({item.quantity} {item.quantity > 1 ? "items" : "item"})</strong> of price <strong>${item.price}</strong> each</div>))}</div>
//                 {/* <p><strong>Items:</strong> {items}</p> */}
//                 <p><strong>Amount:</strong> ${order.totalAmount}</p>
//               </div>
//               </div>
//             ))}
//             </div>
//           )}
//                   </div>
//                 )}

//         </div>
//       )}
//     </div>
//     </div>
// );


// style={{
//                 // height:"55vh",
//     border: "1px solid #ddd",
//     padding: "5px",
//     // borderRadius: "10px",
//     textAlign: "left",
//     background: "#fff",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//               }}

// style={{
//   // display: "grid",
//     // gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
//     // gap: "20px",
//     // padding: "20px",
// }}