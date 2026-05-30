import Link from "next/link";
import { Lock } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Lock className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">DocLock</span>
        </Link>

        <div className="flex gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/documents/id-card"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Add Document
          </Link>
        </div>
      </div>
    </nav>
  );
}
