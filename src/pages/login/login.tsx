import { useAuth } from "@/context/auth.context";
import { GoogleLogin } from "@react-oauth/google";

const Login: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <p>Login com Google</p>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          login(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default Login;
