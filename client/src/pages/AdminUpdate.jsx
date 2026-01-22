import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify'

const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const params = useParams();
    const { authorizationToken, API } = useAuth();

    // Get single user data 
    const getSingleUserData = async () => {
        try {
            // ✅ FIXED: Using API variable instead of hardcoded localhost
            const response = await fetch(`${API}/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const userData = await response.json();
            setData(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to load user data");
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };

    // To update the data dynamically
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // ✅ FIXED: Using API variable instead of hardcoded localhost
            const response = await fetch(`${API}/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Updated Successfully");
            } else {
                toast.error("Not Updated");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user");
        }
    }

    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className='subsection'>
                        {/* our main registration code  */}
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Update User Data</h1>
                            <br />
                            <form onSubmit={handleSubmit} >

                                <div>
                                    <label htmlFor="username">Name</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        required
                                        autoComplete='off'
                                        placeholder="Enter your Name"
                                        value={data.username}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        autoComplete='off'
                                        placeholder="Enter your Email"
                                        value={data.email}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        required
                                        autoComplete='off'
                                        value={data.phone}
                                        onChange={handleInput}
                                    />
                                </div>

                                <br />
                                <button type="submit" className="btn">
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default AdminUpdate
