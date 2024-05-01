import React from "react";
import Button from "components/shared/UI/buttons/Button";
import  {ButtonVariant} from "components/shared/UI/buttons/Button";
import { t } from "i18next";

function PostButton() {
  return (
    <>
      <Button
        variant={ButtonVariant.PRIMARY}
        className="font-bold mt-8 py-3 px-12 w-36"
        type="submit"
      >
        {t("general.post")}
      </Button>
      {/*<Overlay visible={visible} setVisible={setVisible}>*/}
      {/*  <Dialog.Panel className="bg-white w-8/12 p-12 mx-auto flex flex-col items-center">*/}
      {/*    <div className="relative">*/}
      {/*      <img src={frame} className="w-[136px]" alt="" />*/}
      {/*      <Transition.Child*/}
      {/*        as={Fragment}*/}
      {/*        enter="ease-out duration-300 delay-100"*/}
      {/*        enterFrom="opacity-0 scale-50"*/}
      {/*        enterTo="opacity-100 scale-100"*/}
      {/*      >*/}
      {/*        <div className="h-16 w-16 rounded-full bg-green flex justify-center items-center absolute bottom-0 translate-y-1/2 right-7">*/}
      {/*          <IoMdCheckmark className="text-white text-4xl" />*/}
      {/*        </div>*/}
      {/*      </Transition.Child>*/}
      {/*    </div>*/}
      {/*    <h2 className="text-black text-3xl font-bold mt-12">*/}
      {/*      Your video has been posted*/}
      {/*    </h2>*/}
      {/*    <p className="text-black text-3xl font-bold">successfully</p>*/}
      {/*    <Button variant="primary" to="/" className="font-bold !px-12 mt-6">*/}
      {/*      Back to dashboard*/}
      {/*    </Button>*/}
      {/*  </Dialog.Panel>*/}
      {/*</Overlay>*/}
    </>
  );
}

export default PostButton;
