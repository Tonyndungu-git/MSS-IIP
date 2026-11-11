import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import RegisterForm from "@/components/auth/RegisterForm";

export default function Register() {

    return (

        <AuthCard>

            <AuthHeader
                title="Create Organization"
                subtitle="Start using MSS-IIP"
            />

            <RegisterForm />

        </AuthCard>

    );

}