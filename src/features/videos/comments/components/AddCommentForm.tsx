import { ChangeEventHandler, FormEventHandler, useRef } from "react";
import { SendSolid } from "components/shared/icons";
import { t } from "i18next";

type AddCommentFormProps = {
  onSubmitComment: FormEventHandler<HTMLFormElement>;
  commentInputValue: string;
  onCommentChange: ChangeEventHandler<HTMLInputElement>;
  isSubmitButtonDisabled: boolean;
};

const AddCommentForm = ({
  onSubmitComment,
  commentInputValue,
  onCommentChange,
  isSubmitButtonDisabled,
}: AddCommentFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    inputRef?.current?.blur();
    onSubmitComment(e);
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex gap-x-4 bg-main-100 py-3 px-6"
    >
      <input
        ref={inputRef}
        placeholder={t("pages.dashboard.videos.comments.comment")!}
        value={commentInputValue}
        onChange={onCommentChange}
        className="btn grow rounded-2xl border border-gray-200 px-2 py-2 text-sm font-bold tracking-tight placeholder-gray-400 transition-all duration-500 md:px-5"
      />
      <button
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
          isSubmitButtonDisabled ? "bg-gray-400" : "bg-main-600"
        }`}
        disabled={isSubmitButtonDisabled}
      >
        <SendSolid className="fill-white" />
      </button>
    </form>
  );
};

export default AddCommentForm;
