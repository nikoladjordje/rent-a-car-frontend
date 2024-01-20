import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Register = () => {
    const[id, setId] = useState('string');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch('https://localhost:7205/' + 'api/User/RegisterUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id,
                username,
                email,
                password,
                role
            })
        });

        setRedirect(true);
        const formData = { id, username, email, password, role };
        console.log('Registration Data:', formData);
    };

      if(redirect){
        navigate('/login');
      };

      return (
        <div>
          <h2>Register</h2>
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
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* <div>
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div> */}
            <div>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
    );
}

export default Register;