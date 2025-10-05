import React from "react";
import ProviderList from "../../../components/dashboardcomponents/ProviderList";
import OverviewStats from "../../../components/dashboardcomponents/OverviewStats";

const Providers = () => {
  return (
    <div>
      <OverviewStats />
      <ProviderList />
    </div>
  );
};

export default Providers;
