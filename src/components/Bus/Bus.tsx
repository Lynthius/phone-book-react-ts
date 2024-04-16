import { useState, useRef } from "react";

export const Bus = () => {
  const [children, setChildren] = useState([
    {
      name: "Barbara",
      age: "10",
    },
  ]);

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  // ! problem -> possibly null
  const handleAddChild = () => {
    const name = nameRef.current.value;
    const age = ageRef.current.value;
// ? czym jest current value
    if (name && age) {
      setChildren([...children, { name, age }]);
      nameRef.current.value = "";
      ageRef.current.value = "";
    }
  };

  return (
    <div>
      <h2>Add Child</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" ref={nameRef} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" ref={ageRef} />
        </div>
        <button type="button" onClick={handleAddChild}>
          Submit
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {children.map((child, index) => (
            <tr key={index}>
              <td>{child.name}</td>
              <td>{child.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
