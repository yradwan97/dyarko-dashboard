import { PropsWithChildren } from "react";
// @ts-ignore
import signupArt from "assets/images/signup-art.jpg";

const EmptyPage = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col space-y-5 items-center p-10 justify-center">
      <div className="h-[30vh]">
        <img className="w-full h-full" src={signupArt} alt="login-pic" />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default EmptyPage;
