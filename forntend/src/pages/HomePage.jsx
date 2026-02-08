import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimiterUI from "../components/RateLimiterUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../components/lib/axios";
import NotesNotFound from "../components/NotesNotFound";

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNote(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load note");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimiterUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length === 0 && !isLoading && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard note={note} key={note.createdAt} setNote={setNote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
