import { useEffect, useState } from 'react'
import { useAuth } from '../store/Auth';
import { Link } from "react-router-dom"
import "./AdminUsers.css";
import { toast } from 'react-toastify';

const AdminUsers = () => {
    const [users, setUser] = useState([]);
    const { authorizationToken, API } = useAuth();

    const getAllUsersData = async () => {
        try {
            // ✅ FIXED: Using API variable instead of hardcoded localhost
            const response = await fetch(`${API}/api/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users");
        }
    };

    // Delete the user on delete button
    const deleteUser = async (id) => {
        try {
            // ✅ FIXED: Using API variable instead of hardcoded localhost
            const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const data = await response.json();
            console.log(`User after delete: ${data}`);


            if (response.ok) {
                getAllUsersData();
                toast.success("User deleted successfully");
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user");
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <>
            <section className='admin-users-section'>
                <div className="admin-user-container">
                    <h1>Admin Users Data</h1>
                </div>
                <div className='container admin-users'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((curUser, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{curUser.username}</td>
                                        <td>{curUser.email}</td>
                                        <td>{curUser.phone}</td>
                                        <td><Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                                        <td className='deletebutton'>
                                            <button onClick={() => deleteUser(curUser._id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default AdminUsers
