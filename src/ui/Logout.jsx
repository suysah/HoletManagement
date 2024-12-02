import { useLogout } from "../features/authentication/useLogout";
import ButtonIcon from "./ButtonIcon";

import { HiArrowRightOnRectangle } from "react-icons/hi2";
import SpinnerMini from "./SpinnerMini";

const Logout = () => {
  const { logout, isLoggingOut } = useLogout();

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logout} aria-label="Logout">
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};

export default Logout;
