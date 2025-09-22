
const ViewProfileButton = ({id}: {id :string}) => {

  return (
    <button
      className='button-blue bg-yellow-300 h-10 flex items-center'
      onClick={() => console.log(id)}
    >
      Просмотреть профиль
    </button>
  );
};

export default ViewProfileButton;