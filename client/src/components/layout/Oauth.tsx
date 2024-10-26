import { Button } from "../ui/button";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../../firebase.config";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/user/userSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(loginSuccess(data));
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleGoogleClick}
      className="w-full mt-2 border border-slate-400 hover:border-slate-500"
    >
      Continue with Google
    </Button>
  );
}
