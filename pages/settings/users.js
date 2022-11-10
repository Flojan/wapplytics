import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function Users() {
  const { status, data } = useSession();
  const [isLoading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/auth/signup", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        setUsers(userData);
        setLoading(false);
      });
  }, [toggle]);
  if (isLoading) return <div className="h-screen">Loading...</div>;
  if (!users) return <div className="h-screen">No profile data</div>;

  console.log(users);

  if (status === "authenticated" && !data.user.admin) {
    return <div className="h-screen">Not authorized</div>;
  }

  async function createUser(username, password, admin) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password, admin: admin }),
    });
    if (res.ok) setToggle(toggle ? false : true);
  }

  if (status === "authenticated" && data.user.admin) {
    return (
      <div className="flex">
        <button onClick={() => createUser("asdf", "test", false)}>Create User</button>
        <div className="w-full h-screen max-w-md space-y-8">
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return <div className="h-screen">Not allowed.</div>;
  }
}

export default Users;

// https://www.prisma.io/nextjs
// https://www.prisma.io/client
