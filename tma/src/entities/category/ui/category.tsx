interface CategoryProps {
  label: string,
  setId: (_id: string) => void,
  _id: string
  setNameCategory: (label: string) => void
}

const Category = ({label, setId, _id, setNameCategory}: CategoryProps) => {
  const handleClick = () => {
    setId(_id)
    setNameCategory(label)
  }

  return (
    <div
      className="h-full w-full rounded-xl shadow-md p-6 flex
      items-center justify-center text-lg font-medium text-gray-800"
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

export default Category;
