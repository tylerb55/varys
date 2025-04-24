import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to files page as the main entry point
  redirect("/dashboard")
}

