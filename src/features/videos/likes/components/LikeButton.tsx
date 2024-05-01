import { Optional } from "types/optional";
import { Like } from "features/videos/likes/types";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type LikeButtonProps = {
  like: Optional<Like>;
  onLike: () => void;
  disabled: boolean;
};

const LikeButton = ({ like, onLike, disabled }: LikeButtonProps) => {
  return (
    <button
      className="flex flex-col space-y-2 rtl:me-2 items-center"
      onClick={onLike}
      disabled={disabled}
    >
      {like?.status ? (
        <FaHeart className="fill-main-600 text-lg" />
      ) : (
        <FaRegHeart className="text-main-600 text-lg" />
      )}
      <span className="text-black text-xs font-bold">{like?.count || 0}</span>
    </button>
  );
};

export default LikeButton;
