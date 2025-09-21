import AddFriendForm from "@/features/friends/components/addFriend/AddFriendForm.tsx";
import RequestFriends
  from "@/features/friends/components/requestFriends/RequestFriends.tsx";
import ActiveFriends from "@/features/friends/components/activeFriends/ActiveFriends.tsx";

const FriendSection = () => {
  return (
    <section className='container flex flex-col gap-y-6'>
      <h3 className='text-2xl font-bold color-font'>Друзья</h3>
      <AddFriendForm/>
      <RequestFriends/>
      <ActiveFriends/>
    </section>
  );
};

export default FriendSection;