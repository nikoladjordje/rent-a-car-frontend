import { useState, useEffect } from "react";
import AddVehicle from "../components/AddVehicle";
import Reservations from "../components/Reservations";
import Reviews from "../components/Reviews";
const Account = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const fetchData = async () => {
        const response = await fetch(`https://localhost:7205/api/User/GetUserById?userId=${props.userId}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });

        if (!response.ok) {
          console.error('Failed to fetch data');
          return;
        }

        var content = await response.json();
        setUsername(content.username);
        setEmail(content.email);
        setRole(content.role);
        setPassword(content.password);
        // console.log(content)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`https://localhost:7205/api/User/UpdateUser?userId=${props.userId}&newUsername=${username}&newEmail=${email}&newPassword=${password}&newRole=${role}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            mode:"cors"
        });

        const formData = { username, email, password, role };
        console.log('Update Data:', formData);
    };

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <div>
          <h2>Update account info</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit">Update</button>
            </div>
          </form>

          <AddVehicle userId={props.userId}/>
          <Reservations userId={props.userId}/>
          <Reviews userId={props.userId}/>
        </div>
    );
}

export default Account;