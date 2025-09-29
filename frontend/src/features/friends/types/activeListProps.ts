import type {UserType} from "@/shared/types/userType.ts";

export type ActiveListProps = {
  activeFriends: UserType[];
  isLoading?: boolean;
  type: 'myProfile' | 'profile'
}