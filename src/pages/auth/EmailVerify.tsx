import { Loader } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const EmailVerify = () => {
    const [searchParams] = useSearchParams();

    const [verifierToken] = useState({
        id: searchParams.get("id"),
        token: searchParams.get("token"),
    })

    const navigate = useNavigate();

    const tokenVerifierHandler = async () => {
        const res: any = await axios.post('http://localhost:8000/api/auth/verifyEmail', verifierToken);
        if (res?.data.status === 1) {
            toast.success("Email verified successfully!");
            navigate("/");
        } else {
            toast.error("Email Already Verified");
            navigate("/");
        }
    }

    useEffect(() => {
        tokenVerifierHandler();
    }, []);

    return (
        <>
            <div className='flex items-center justify-center h-screen w-full'>

                <Loader variant='dots' size={'md'} />
            </div>
        </>
    )

}