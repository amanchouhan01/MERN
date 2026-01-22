
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from "../store/Auth";
import "./AdminContacts.css";
import { toast } from 'react-toastify';

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getContactsData = async () => {
    try {
      // ✅ FIXED: Using API variable instead of hardcoded localhost
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts");
    }
  };

  // Defining the function deleteContactById
  const deleteContactById = async (id) => {
    try {
      // ✅ FIXED: Using API variable instead of hardcoded localhost
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        }
      });

      if (response.ok) {
        getContactsData();
        toast.success("Deleted Successfully");
      } else {
        toast.error("Not Deleted");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
    }
  }

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <section className='adminContactsSection'>
      <h1>Admin Contact Data</h1>
      <div className='adminUsersContainer'>
        {contactData.map((curContactData, index) => {
          const { username, email, message, _id } = curContactData;
          return (
            <div key={index}>
              <p>{username}</p>
              <p>{email}</p>
              <p>{message}</p>
              <button className='dltbtns' onClick={() => deleteContactById(_id)}>Delete</button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default AdminContacts
