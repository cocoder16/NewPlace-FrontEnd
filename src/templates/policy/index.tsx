import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { isNil } from "lodash";

import Contract from "./Contract";
import Privacy from "./Privacy";
import Cancellation from "./Cancellation";
import RadioTabs from "src/UI/MUI/customs/radioTabs";

function Policy() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [tabIndex, setTabIndex] = useState<number | null>(null);

  const tabs = useMemo(() => {
    return [
      { label: "이용약관", path: "/policy/contract" },
      { label: "개인정보 처리방침", path: "/policy/privacy" },
      { label: "취소 및 환불 정책", path: "/policy/cancellation" },
    ];
  }, []);

  useEffect(() => {
    const tabIndex = tabs.findIndex(tab => tab.path.split("/policy/")[1] === routeParams.tab);

    setTabIndex(tabIndex);
  }, [routeParams, tabs]);

  const handleTabChange = (newIndex: number) => {
    navigate(tabs[newIndex].path);
  };

  if (isNil(tabIndex)) {
    return null;
  }

  return (
    <div>
      <nav id="policy-nav">
        <RadioTabs tabIndex={tabIndex} tabsProps={tabs} onChange={handleTabChange} />
      </nav>
      {tabIndex === 0 && <Contract />}
      {tabIndex === 1 && <Privacy />}
      {tabIndex === 2 && <Cancellation />}
      {tabIndex === -1 && <Navigate to="/not-found" replace />}
    </div>
  );
}

export default Policy;
