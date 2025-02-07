import Image from "next/image";
import logo_dark from "@/public/images/logo_dark.png";
import Button from "@/app/_components/common/button";

interface SignUpProps {
  children: React.ReactNode;
}

const SignUp: React.FC<SignUpProps> = ({ children }) => {
  // Redirect to /signup/choose-role by default

  return (
    <div className="flex flex-col items-center justify-center mt-24 mx-auto w-[clamp(10rem,94rem,85vw)]">
      <div className="grid w-full grid-cols-2 rounded-2xl shadow-md overflow-hidden">
        <div className="flex flex-col items-center p-28 bg-[var(--foreground-color)]">
          <Image src={logo_dark} alt="logo_light" className="max-w-60" />
          <h1 className="relative mt-20 text-4xl font-bold">
            Welcome Back !
            <span className="absolute bottom-[-0.5rem] left-[-12.5%] w-[125%] h-[0.1rem] bg-current"></span>
          </h1>
          <p className="text-xl mt-6 text-center font-bold mb-10">
            To keep connected with us please login with your personal info
          </p>
          <Button>Sign in</Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SignUp;
