// import {useParams} from "react-router-dom";
import UserCard from "@/widgets/userCard/UserCard.tsx";
// import {useGetUserData} from "@/shared/lib/useGetUserData.ts";

const UserCardSection = () => {
  // const {id} = useParams()
  // const {data: userData} = useGetUserData(id || '')

  // console.log(userData)
  return (
    <section className='container mb-8'>
      <UserCard userName={'dana'} type='profile'/>
    </section>
  );
};

export default UserCardSection;