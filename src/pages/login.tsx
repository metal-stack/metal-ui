import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logo from "@/assets/metal-stack.png";

const VITE_API_URL = import.meta.env.VITE_API_URL ?? "";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sidebar">
      <Card className="w-full max-w-md p-8">
        <div className="mb-4 flex justify-center flex-col items-center">
          <img src={logo} alt="metal-stack" className="h-16 w-16 mb-4" />
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <Button
          className="w-full"
          onClick={() => {
            window.location.href =
              `${VITE_API_URL}/auth/openid-connect?redirect-url=` +
              encodeURIComponent(window.location.origin + "/auth/callback");
          }}
        >
          Connect
        </Button>
      </Card>
    </div>
  );
}
