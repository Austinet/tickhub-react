import DashboardLayout from "../layouts/DashboardLayout";
import { useAuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { ticketList = [] } = useAuthContext();

  return (
    <DashboardLayout>
      <section>
        {/* Header */}
        <div className="space-y-5 mb-5">
          <h1 className="text-xl md:text-3xl font-medium leading-tight text-gray-700">
            Dashboard
          </h1>
          <h2 className="text-lg md:text-2xl text-gray-700">Ticket Summary</h2>
        </div>
        <div className="flex items-center justify-between gap-2 text-center">
          <div className="space-y-2 bg-blue-200 p-2 lg:p-8 rounded-2xl">
            <h3 className="text-[0.8rem] md:text-base lg:text-[1.3rem]">Total Tickets</h3>
            <p className="text-blue-800 lg:text-6xl">{ticketList.length}</p>
          </div>
          <div className="space-y-2 bg-green-200 p-2 lg:p-8 rounded-2xl">
            <h3 className="text-[0.8rem] md:text-base lg:text-[1.3rem]">Open Tickets</h3>
            <p className="text-green-800 lg:text-6xl">{ticketList.length > 0 ? ticketList.filter(ticket => ticket?.status === 'open').length : 0}</p>
          </div>
          <div className="space-y-2 bg-gray-200 p-2 lg:p-8 rounded-2xl">
            <h3 className="text-[0.8rem] md:text-base lg:text-[1.3rem]">Resolved Tickets</h3>
            <p className="text-gray-800 lg:text-6xl">{ticketList.length > 0 ? ticketList.filter(ticket => ticket?.status === 'closed').length : 0}</p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}

export default Dashboard