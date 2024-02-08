import { getAllUsers } from "@/data-access/user";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/actions/deleteUser";
const dashboard = async () => {
  const session = await auth();
  const user = session?.user;
  if (user?.role === "ADMIN") {
    const allUsersData = await getAllUsers();
    return (
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                role
              </th>
              <th scope="col" className="px-2 py-3">
                verifiedEmail
              </th>
              <th scope="col" className="px-2 py-3">
                Delete User
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsersData?.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.email}
                </td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  {user.emailVerified ? "Yes" : "No"}
                </td>
                <td className=" text-destructive/90 font-semibold px-6 py-4">
                  <form
                    action={async () => {
                      "use server";
                      deleteUser(user.id);
                    }}
                  >
                    <Button
                      size="sm"
                      type="submit"
                      variant="outline"
                      className="hover:text-destructive"
                    >
                      Delete
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <div>dashboard</div>;
};

export default dashboard;
