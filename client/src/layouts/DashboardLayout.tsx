import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({
  children,
}: Props) => {
  const navigate = useNavigate();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const user = useAuthStore(
    (state) => state.user
  );

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-black text-white px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          GigFlow CRM
        </h1>

        <div className="flex items-center gap-4">
          <p>
            {user?.name}
          </p>

          <button
            onClick={handleLogout}
            className="bg-white text-black px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;