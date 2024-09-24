import React, { useState } from "react";

function Home() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("");

  // Add or update course (To-Do item)
  const handleAddOrUpdateCourse = () => {
    if (!newCourse.trim()) return;

    if (editIndex !== null) {
      const updatedCourses = courses.map((course, index) =>
        index === editIndex ? newCourse : course
      );
      setCourses(updatedCourses);
      setEditIndex(null);
    } else {
      setCourses([...courses, newCourse]);
    }

    setNewCourse(""); // Clear input field
  };

  // Delete course using filter
  const deleteCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  // Start editing a course
  const handleEditCourse = (index) => {
    setNewCourse(courses[index]);
    setEditIndex(index);
  };

  // Handle filter input change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtered courses based on filter text
  const filteredCourses = courses.filter((course) =>
    course.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 to-purple-700 p-8">
      <div className="bg-white max-w-lg w-full rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-4">
          To-Do List
        </h1>

        {/* Filter Input */}
        <div className="relative flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 outline-none text-center"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>

        {/* Add/Edit To-Do Input */}
        <div className="relative flex justify-center space-x-2 mb-6">
          <input
            type="text"
            placeholder="Add or edit your task"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
          />
          <button
            onClick={handleAddOrUpdateCourse}
            className={`px-6 py-3 rounded-full text-white font-medium ${
              editIndex !== null
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            } transition duration-200 ease-in-out`}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* To-Do List */}
        <ul className="space-y-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((val, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-50 rounded-lg shadow-sm p-4"
              >
                <span className="text-gray-800 text-lg">{val}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCourse(i)}
                    className="px-4 py-2 text-sm text-white bg-yellow-400 hover:bg-yellow-500 rounded-full shadow transition duration-200 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCourse(i)}
                    className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-full shadow transition duration-200 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No tasks found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
