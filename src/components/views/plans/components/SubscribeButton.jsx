import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "components/shared/UI/buttons/Button";

function SubscribeButton() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <>
      <Button
        variant="primary"
        className={`${
          subscribed ? "!bg-black !border-black hover:!bg-black/90" : ""
        } w-full`}
        onClick={() => setSubscribed(!subscribed)}
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </Button>
      {subscribed ? (
        <p className="text-center mt-6">
          <Link to="check-remaining" className="border-b border-gray-500">
            Check remaining
          </Link>
        </p>
      ) : null}
    </>
  );
}

export default SubscribeButton;
