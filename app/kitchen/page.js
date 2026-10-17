import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/kitchen");
  }

  if (session.role !== "staff") {
    return (
      <main>
        <h1>Forbidden</h1>

        <p>
          This page is available only to staff.
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>Kitchen</h1>

      <p>
        Staff order management.
      </p>
    </main>
  );
}
