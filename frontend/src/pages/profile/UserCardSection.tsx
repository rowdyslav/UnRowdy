import {useParams} from "react-router-dom";
import UserCard from "@/widgets/userCard/UserCard.tsx";
import {useAuthStore} from "@/app/providers/auth/authStore.ts";
import type {ProfileType} from "@/shared/types/profileType.ts";
import {useGetUserData} from "@/shared/lib/useGetUserData.ts";
import type {UserType} from "@/shared/types/userType.ts";

const UserCardSection = ({type}: ProfileType) => {
  const { username } = useParams();
  const user = useAuthStore(state => state.user);

  const { data: userData } = useGetUserData(username || '');

  let data: UserType

  if (userData){
    data = userData[0]
  }

  const getUserName = (): string => {
    if (data?.username) return data.username;
    if (user?.username) return user.username;
    return 'Не существует пользователя';
  };

  return (
    <section className='container mb-8'>
      <UserCard userName={getUserName()} type={type}/>
    </section>
  );
};

export default UserCardSection;