import React from "react";
import { Modal, Typography } from "components/shared/UI";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  hideAddVideoModal,
  selectModalState,
} from "features/videos/slices/AddVideoModalSlice";
import AddVideoForm, {
  AddVideoFormData,
} from "features/videos/components/AddVideoForm";
import { useMutateVideos } from "features/videos/hooks/query/useMutateVideos";
import { t } from "i18next";

function AddVideoModal() {
  const dispatch = useAppDispatch();
  const isAddVideoModalShown = useAppSelector(selectModalState);
  const { createVideo } = useMutateVideos();

  const handleVideoSubmit = (data: AddVideoFormData) => {
    const video = new FormData();
    video.append("description", data.description);
    video.append("title", data.title);
    video.append("video", data.videoFiles[0]);
    video.append("payment_option", data.paymentOption);
    createVideo(video);
  };

  const hideModal = () => dispatch(hideAddVideoModal());

  return (
    <Modal
      isOpen={isAddVideoModalShown}
      onClose={hideModal}
      className="h-[90vh]"
    >
      <div className="p-10">
        <div className="flex flex-col space-y-5">
          <Typography variant="h3" as="h2" className="text-center capitalize">
            {t("general.videos.add-video.text")}
          </Typography>
          <Typography
            variant="body-md-medium-tall"
            as="p"
            className="text-center text-gray-400"
          >
            {t("general.videos.add-video.message")}
          </Typography>
        </div>
        <AddVideoForm submitHandler={handleVideoSubmit} />
      </div>
    </Modal>
  );
}

export default AddVideoModal;
