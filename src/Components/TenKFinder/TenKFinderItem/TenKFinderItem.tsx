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
      className="inline-flex items-center px-3 py-2 mr-2 mb-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaFileAlt className="mr-1" />
      10-K {fillingDate}
    </Link>
  );
};

export default TenKFinderItem;
