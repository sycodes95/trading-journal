import { ReactSVG } from "react-svg";
import tradesSVG from "../../../icons/trades.svg"

function Banner () {
  return (
    <div className="section-info col-span-4 text-white p-4 bg-red-600 bg-opacity-50 rounded-sm
      grid  row-start-1">
      <div className="">
        <ReactSVG className="h-14 w-14 fill-current" src={tradesSVG}/>
      </div>

      <div className="pl-8">
        <div className="text-3xl">
          <span>Dashboard</span>
        </div>
        <div className="text-sm">
          <span>
            View statistics, performance, and make use of the advanced reports chart by filtering different sets of parameters to measure performance
          </span>
        </div>
      </div>
    </div>
  )
}

export default Banner