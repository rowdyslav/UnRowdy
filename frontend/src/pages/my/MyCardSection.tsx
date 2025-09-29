import {useAuthStore} from "@/app/providers/auth/authStore.ts";
import UserCard from "@/widgets/userCard/UserCard.tsx";

const MyCardSection = () => {
  const user = useAuthStore(state => state.user)

  return (
    <section className='container mb-8'>
      <UserCard userName={user?.username} type='myProfile'/>
    </section>
  );
};

export default MyCardSection;