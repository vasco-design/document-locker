import Link from "next/link";
import { Edit2, Plus } from "lucide-react";

interface DocumentCardProps {
  icon: React.ReactNode;
  title: string;
  data: any;
  editLink: string;
  fields: Array<{ label: string; value: string }>;
}

export default function DocumentCard({
  icon,
  title,
  data,
  editLink,
  fields,
}: DocumentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl">{icon}</div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {data ? (
          <>
            {/* Fields Display */}
            <div className="space-y-3 mb-6">
              {fields.map((field, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-gray-600 text-sm">{field.label}</span>
                  <span className="text-gray-900 font-medium text-sm">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Edit Button */}
            <Link
              href={editLink}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Link>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No document added yet</p>
            <Link
              href={editLink}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Add
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
