/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  //1
  const numBookings = bookings.length;

  //2 Sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3 Checkins
  const checkins = confirmedStays.length;

  //4 occupancy
  const occupancy =
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / numDays) *
    cabinCount;

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        color="blue"
        value={numBookings}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        color="violet"
        value={checkins}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy"
        color="yellow"
        value={Math.round(occupancy) + `%`}
      />
    </>
  );
};

export default Stats;
