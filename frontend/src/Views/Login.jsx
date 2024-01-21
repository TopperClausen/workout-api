import React from 'react';
import Input from '../components/input';
import Submit from '../components/submit';

const Login = () => {
    const onClick = () => {
        console.log('perform login...');
    }

    return (
        <div className="flex justify-center">
            <div className="shadow rounded-lg py-3 px-2">
                <div className="text-center w-full md:w-[600px]">
                    <h3> Login </h3>
                </div>
                <div className="space-y-5">
                    <Input placeholder="Email" label="Email" type="email" />
                    <Input placeholder="Password" label="Password" type="password" />
                    <Submit text="Login" onClick={onClick} />
                </div>
            </div>
        </div>
    )
}

export default Login;