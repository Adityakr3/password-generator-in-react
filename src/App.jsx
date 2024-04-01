import { useCallback, useEffect, useRef, useState } from "react";
import "./index.css";
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  
  const copyPasswordFromInput = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  },[Password])
  const passwordRef = useRef(null)
  useEffect(()=>{
   passwordGenerator()
  },[length , numberAllowed , charAllowed , passwordGenerator])
  return (
    <div className="w-[45%] mx-auto shadow-md rounded-lg px-8 py-8 my-28 bg-gray-800 text-white-950 overflow-hidden">
      <h1 className="text-white p-2 text-center text-2xl font-bold">
        PASSWORD GENERATOR
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          placeholder="password"
          value={Password}
          readOnly
          ref={passwordRef}
          className="outline-none w-full py-1 px-3  text-zinc-950 font-bold"
        />
        <button onClick={copyPasswordFromInput} className="bg-slate-200 p-3 px-8 text-zinc-950 hover:bg-gray-950 hover:text-white font-semibold">Copy</button>
      </div>
      <div className="flex  text-lg  justify-between items-center">
        <div className="flex items-center">
          <input
            type="range"
            max={25}
            min={4}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
            className="cursor-pointer mr-3"
          />
          <label>Lenght : {length}</label>
          {""}
        </div>
        <div>
          <input
            defaultChecked={numberAllowed}
            className="cursor-pointer mr-1"
            id="number"
            type="checkBox"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          {""}
          <label htmlFor="number">Number</label>
        </div>
        <div>
          <input
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            defaultChecked={charAllowed}
            className="cursor-pointer mr-1"
            id="char"
            type="checkBox"
          />
          {""}
          <label htmlFor="char">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
