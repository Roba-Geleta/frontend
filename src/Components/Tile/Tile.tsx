interface Props {
  title: string;
  subTitle: string;
}

const Tile = ({ title, subTitle }: Props) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
      <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center">
        <h5 className="text-gray-500 dark:text-gray-400 uppercase font-semibold text-xs mb-1">
          {title}
        </h5>
        <p className="text-lg font-bold text-gray-800 dark:text-gray-100 break-words">
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default Tile;
