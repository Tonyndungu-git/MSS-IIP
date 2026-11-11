import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";

export default function Login(){

    return(

        <AuthCard>

            <AuthHeader

                title="Welcome Back"

                subtitle="Sign in to MSS-IIP"

            />

            <LoginForm/>

        </AuthCard>

    );

}