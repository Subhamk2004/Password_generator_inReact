import {useCallback, useEffect, useState, useRef} from 'react'
import './App.css'

function App() {
  let [pass_length, setPass_length] = useState(10);
  let [password, setPassword] = useState('');
  let [useNumbers, setUseNumbers] = useState(true);
  let [useChars, setUseChars] = useState(true);

  let pass_ref = useRef(null);

  let password_generator_function = useCallback(function (){
    let password = '';
    let pass_selection_string =
        'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    if (useChars)
    {
      pass_selection_string += '!@#$%^&*()_-=+{}[]?/,.';
    }
    if (useNumbers)
    {
      pass_selection_string += '1234567890';
    }
    for (let i = 0; i < pass_length; i++){
      let index = Math.floor(Math.random() * (pass_selection_string.length) + 1);
      password = password + pass_selection_string.charAt(index);
    }
        console.log(password);
    setPassword(password);
      },
      [pass_length, useNumbers, useChars, setPassword]);

  useEffect(() => {
    password_generator_function()
  }, [pass_length, useNumbers, useChars, password_generator_function]);

  let select_pass = useCallback(() => {
    pass_ref.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);
  return (
    <div className="App">
      <h1 className='text-center
      text-blue-300 font-semibold text-3xl mt-9'>
        Password Generator in React
      </h1>
      <div className="text-center mt-7 bg-gray-950 shadow-md p-4 rounded-2xl">
        <div className='flex-row flex justify-center items-center'>
          <input
              type='text'
              value={password}
              readOnly
              ref={pass_ref}
              className='text-center bg-gray-600 rounded-bl-2xl rounded-tl-2xl
           focus:outline-none text-blue-100 h-9 text-2xl shadow-md shadow-gray-900'
              placeholder='password'
          />
          <button
              onClick={select_pass}
              className='bg-amber-500 h-9 px-2 rounded-br-2xl rounded-tr-2xl
          text-2xl font-semibold text-black'>
            copy
          </button>
        </div>
        <div className='flex-row gap-3 flex justify-center items-center mt-7'>
          <input id='len'
                 className='w-12'
                 type='range' min='0' max='40' value={pass_length}
                 onChange={(e) => {
                   setPass_length(e.target.value);
                 }}
          />
          <label htmlFor='len' className='text-blue-200'>
            length: {pass_length}
          </label>
          <input id='num'
                 type='checkbox' defaultChecked={useNumbers}
                 onChange={() => {
                   setUseNumbers(!useNumbers);
                 }}
          />
          <label htmlFor='num' className='text-blue-200'>Numbers</label>

          <input id='char'
                 type='checkbox' defaultChecked={useChars}
                 onChange={() => {
                   setUseChars(!useChars);
                 }}
          />
          <label htmlFor='char' className='text-blue-200'>
            Special Characters
          </label>
        </div>
      </div>
    </div>
  )
}

export default App
