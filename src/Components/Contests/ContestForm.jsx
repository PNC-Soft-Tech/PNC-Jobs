// components/CreateContestForm.js
import { useState } from "react";
import { createContest } from "../api/contest";

const CreateContestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    questions: [],
    startContest: "",
    endContest: "",
    totalMarks: 0,
    totalTime: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createContest(formData);
      console.log("Contest created:", result);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error("Error creating contest:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Contest Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      {/* Add more input fields for questions, start/end time, total marks, etc. */}
      <button type="submit">Create Contest</button>
    </form>
  );
};

export default CreateContestForm;
