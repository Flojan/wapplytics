import Loginform from "../components/loginform";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Loginform />
      </div>
    </div>
  );
}
