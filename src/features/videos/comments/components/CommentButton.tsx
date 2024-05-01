import { BsChat } from "react-icons/bs";
import { Optional } from "types/optional";

type CommentButtonProps = {
  commentsCount: Optional<number>;
};
const CommentButton = ({ commentsCount }: CommentButtonProps) => {
  return (
    <button className="flex flex-col space-y-2 items-center">
      <BsChat className="text-main-600 text-lg" />
      <span className="text-black text-xs font-bold">{commentsCount || 0}</span>
    </button>
  );
};

export default CommentButton;
