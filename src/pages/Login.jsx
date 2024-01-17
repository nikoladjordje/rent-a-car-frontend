import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch(`https://localhost:7205/api/User/LoginUser?username=${username}&password=${password}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            mode:"cors"
        });

        const content = await response.json();

        props.setUsername(content.username);
        props.setUserId(content.userId);
        setRedirect(true);

    };

    if(redirect){
        navigate('/');
    };

    return (
        <form onSubmit={submit}>
            <h2 className="">Please log in</h2>
            <div className="">
                <input type="username" className="form-control" placeholder="username" required onChange={e => setUsername(e.target.value)}/>
                <label >Username</label>
            </div>
            <div className="">
                <input type="password" className="form-control" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                <label >Password</label>
            </div>
            <button className="" type="submit">Sign in</button>
        </form>
    );

}
export default Login;