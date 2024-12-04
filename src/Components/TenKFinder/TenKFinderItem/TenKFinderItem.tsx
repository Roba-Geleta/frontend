import { CompanyTenK } from "../../../company";
import { Link } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";

type Props = {
  tenk: CompanyTenK;
};

const TenKFinderItem = ({ tenk }: Props) => {
  const fillingDate = new Date(tenk.fillingDate).getFullYear();
  return (
    <Link
      to={tenk.finalLink}
      className="inline-flex outline outline-gray-400 w-[102px]  items-center px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaFileAlt className="mr-1" />
      10-K {fillingDate}
    </Link>
  );
};

export default TenKFinderItem;
