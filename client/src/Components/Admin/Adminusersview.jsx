import React, { useState } from 'react';

const initialUsers = [
  { id: 3, name: 'Besique Monroe', role: 'Administrator', createdAt: 'Sep 28, 2022', status: 'Active' },
  { id: 77, name: 'James Cavier', role: 'Author', createdAt: 'Sep 28, 2022', status: 'Active' },
  { id: 12, name: 'Elvis Son', role: 'Editor', createdAt: 'Sep 28, 2022', status: 'Suspended' },
  { id: 66, name: 'Dana White', role: 'Administrator', createdAt: 'Sep 28, 2022', status: 'Active' },
  { id: 13, name: 'Elvis Son', role: 'Editor', createdAt: 'Sep 28, 2022', status: 'Suspended' },
  { id: 33, name: 'Ajinas', role: 'Administrator', createdAt: 'Sep 28, 2022', status: 'Active' },
  { id: 7, name: ' john', role: 'Author', createdAt: 'Sep 28, 2022', status: 'Active' },
  { id: 1, name: 'steve', role: 'Editor', createdAt: 'Sep 28, 2022', status: 'Suspended' },
  { id: 6, name: ' White', role: 'Administrator', createdAt: 'Sep 28, 2022', status: 'Inactive' },
  { id: 122, name: ' Son', role: 'Editor', createdAt: 'Sep 28, 2022', status: 'Suspended' },
  { id: 13, name: ' joseph', role: 'Editor', createdAt: 'Sep 28, 2022', status: 'Suspended' },
  { id: 15, name: ' abc', role: 'Editor', createdAt: 'Sep 28, 2022', status: 'Suspended' },
];

const statuses = ['Active','Suspended', 'Blocked'];

function getStatusClasses(status) {
  switch (status) {
    case 'Active':
      return 'bg-green-200 text-green-900';
    case 'Suspended':
      return 'bg-yellow-200 text-yellow-900';
    case 'Blocked':
      return 'bg-red-200 text-red-900';
    default:
      return '';
  }
}

function Adminusersview() {
  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const handleStatusChange = (id, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, status: newStatus }
          : user
      )
    );
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-gray-700">User Accounts</h2>
            <span className="text-xs text-gray-500">View accounts of registered users</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="ml-10 space-x-8 lg:ml-40">
              <button className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                  />
                </svg>
                CSV
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Full Name</th>
                  <th className="px-5 py-3">User Role</th>
                  <th className="px-5 py-3">Created at</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{user.id}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{user.name}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{user.role}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{user.createdAt}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(user.status)}`}
                      >
                        {statuses.map((statuses) => (
                          <option key={statuses} value={statuses}>
                            {statuses}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length} Entries
            </span>
            <div className="mt-2 inline-flex sm:mt-0">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminusersview;
