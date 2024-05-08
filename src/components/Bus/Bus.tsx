import { useState, useRef, ElementRef } from "react";

export const Bus = () => {
  const [children, setChildren] = useState([
    {
      name: "Barbara",
      age: "10",
    },
  ]);

  const nameRef = useRef<ElementRef<"input">>(null);
  // ElementRef blokuje możliwość przypięcia do innego typu niż wskazany
  const ageRef = useRef<ElementRef<"input">>(null);
  // ! problem -> possibly null
  const handleAddChild = () => {
    if(nameRef && nameRef.current && ageRef && ageRef.current){
      const name = nameRef.current.value;
      const age = ageRef.current.value;
      // current to obecnie przypięty element do referencji
       setChildren([...children, { name, age }]);
       nameRef.current.value = "";
      ageRef.current.value = "";
    }
  };

  return (
    <div>
      <h2>Add Child</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={nameRef} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline" type="number" ref={ageRef} />
        </div>
        <button className="bg-gray-700 hover:bg-gray-500 text-white flex items-center font-bold py-2 px-4 rounded" type="button" onClick={handleAddChild}>
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
