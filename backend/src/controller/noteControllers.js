import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res.status(404).json({ message: "Not couldn't be found" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const newNotes = await newNote.save();
    res.status(201).json(newNotes);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const notesUpdate = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true },
    );
    if (!notesUpdate)
      return res.status(404).json({ message: "Couldn't found note" });
    res.status(200).json(notesUpdate);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const nodeDelete = await Note.findByIdAndDelete(req.params.id);
    if (!nodeDelete)
      return res.status(404).json({ message: "Couldn't found note" });
    res.status(200).json(nodeDelete);
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
