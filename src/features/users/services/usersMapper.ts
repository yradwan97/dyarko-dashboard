import { ServerUser, User } from "features/users";
import { plansMapper } from "features/plans";

export interface UsersMapper {
  toServerUser: (user: User) => ServerUser;
  toUser: (serverUser: ServerUser) => User;
}

export const usersMapper: UsersMapper = {
  toServerUser: (user: User) => {
    const serverPlan = user.plan
      ? plansMapper.toServerUserPlan(user.plan)
      : undefined;
    return {
      _id: user.id,
      civilian_id: user.civilianId,
      reset_password_code: user.resetPasswordCode,
      name: user.name,
      image: user.image,
      email: user.email,
      type: user.type,
      phone: user.phone,
      subMerchantId: user.subMerchantId,
      upload_properties: user.uploadProperties,
      upload_videos: user.uploadVideos,
      points: user.points,
      role: user.role,
      status: user.status,
      is_confirmed: user.isConfirmed,
      average_rating: user.averageRating,
      number_of_properties: user.propertiesNumber,
      number_of_reviewers: user.reviewersNumber,
      total_balance: user.totalBalance,
      plan: serverPlan,
    };
  },
  toUser: (serverUser: ServerUser) => {
    const plan = serverUser.plan
      ? plansMapper.toUserPlan(serverUser.plan)
      : undefined;
    return {
      id: serverUser._id,
      civilianId: serverUser.civilian_id,
      resetPasswordCode: serverUser.reset_password_code,
      name: serverUser.name,
      image: serverUser.image,
      email: serverUser.email,
      type: serverUser.type,
      phone: serverUser.phone,
      subMerchantId: serverUser.subMerchantId,
      uploadProperties: serverUser.upload_properties,
      uploadVideos: serverUser.upload_videos,
      points: serverUser.points,
      role: serverUser.role,
      status: serverUser.status,
      isConfirmed: serverUser.is_confirmed,
      averageRating: serverUser.average_rating,
      propertiesNumber: serverUser.number_of_properties,
      reviewersNumber: serverUser.number_of_reviewers,
      totalBalance: serverUser.total_balance,
      plan,
    };
  },
};
