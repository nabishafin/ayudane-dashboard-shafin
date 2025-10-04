import OverviewStats from "@/components/dashboardcomponents/OverviewStats";
import { TransactionsTable } from "../../../components/dashboardcomponents/TransactionsTable";

const Earnings = () => {
  return (
    <div>
      <OverviewStats />
      <TransactionsTable />
    </div>
  );
};

export default Earnings;
