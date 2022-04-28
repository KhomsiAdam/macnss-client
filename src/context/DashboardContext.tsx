import { createContext, useState } from 'react';

interface DashboardContextInterface {
  isDashboard: boolean;
  setIsDashboard: (token: boolean) => void;
  isClients: boolean;
  setIsClients: (token: boolean) => void;
}
const DashboardContext = createContext<DashboardContextInterface>({
  isDashboard: true,
  setIsDashboard: () => {},
  isClients: false,
  setIsClients: () => {},
});

export const DashboardProvider = (props: any) => {
  const [isDashboard, setIsDashboard] = useState<boolean>(true);
  const [isClients, setIsClients] = useState<boolean>(false);

  return (
    <DashboardContext.Provider
      value={{
        isDashboard,
        setIsDashboard,
        isClients,
        setIsClients,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
