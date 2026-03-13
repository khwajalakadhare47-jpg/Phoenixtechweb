import { useAdmin } from "../../contexts/AdminContext";
import { MessageSquare, Mail, Phone, Calendar, User } from "lucide-react";

export function AdminResponses() {
  const { responses, updateResponseStatus } = useAdmin();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <MessageSquare className="text-[#C9A24D]" /> Admission Responses
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {responses.map((res) => (
          <div key={res.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9A24D]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Student Name</p>
                <p className="font-bold flex items-center gap-2"><User className="w-4 h-4"/> {res.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                <p className="text-sm flex items-center gap-2"><Mail className="w-4 h-4"/> {res.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Mobile Number</p>
                <p className="text-sm flex items-center gap-2"><Phone className="w-4 h-4"/> {res.mobileNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Inquiry Type</p>
                <p className="text-sm capitalize">{res.inquiryType}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Current Class</p>
                <p className="text-sm">{res.currentClass}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Preferred Batch</p>
                <p className="text-sm capitalize">{res.preferredBatch}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Consent to Contact</p>
                <p className="text-sm">{res.consentToContact}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Interested Courses</p>
                <div className="flex flex-wrap gap-1">
                  {res.interestedCourses.map(c => (
                    <span key={c} className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded">{c}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Status Manager */}
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Submitted on: {res.submittedAt}
              </p>
              <select value={res.status} onChange={e => updateResponseStatus(res.id, e.target.value as any)} 
                className="text-xs border rounded p-1">
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        ))}
        {responses.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
            No admission responses yet.
          </div>
        )}
      </div>
    </div>
  );
}
