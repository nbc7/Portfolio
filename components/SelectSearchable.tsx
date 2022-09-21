import { useState } from 'react';

interface selectProps {
  data: Array<any>;
  returnData: CallableFunction;
}

export function SelectSearchable({ data, returnData }: selectProps) {
  const [sugestionsActive, setSugestionsActive] = useState(false);
  const [sugestionIndex, setSugestionIndex] = useState(0);
  const [selectValue, setSelectValue] = useState('');

  const inputStyle = 'text-black w-[250px] sm:w-[500px] md:w-[628px] lg:w-[884px] rounded px-2 mb-4';

  const sugestionData = data?.filter((i) => {
    return i.name.toLowerCase().indexOf(selectValue.toLowerCase()) > -1;
    // return i.toLowerCase().startsWith(itemname.toLowerCase());
    // return i.toLowerCase().includes(itemname.toLowerCase());
  });

  const showSugestions: boolean = sugestionsActive && sugestionData.length > 0;

  const Sugestions = () => {
    return (
      <ul className="bg-white rounded border text-cinza-600">
        {sugestionData.map((rep, index) => {
          return (
            <li
              className={`${index === sugestionIndex && 'bg-azul-500 text-cinza-900'} hover:bg-azul-500 hover:text-cinza-900 rounded px-2`}
              key={index}
              onClick={handleClick}
            >
              {rep.name}
            </li>
          );
        })}
      </ul>
    );
  };

  const handleKeyDown = (e) => {
    // e.preventDefault();
    // console.log(e);
    if (!sugestionsActive) return;

    // UP ARROW
    if (e.keyCode === 38) {
      if (sugestionIndex === 0) return;
      setSugestionIndex(sugestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (sugestionIndex === sugestionData.length - 1) return;
      // if (sugestionIndex - 1 === data.length) return;
      setSugestionIndex(sugestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setSelectValue(sugestionData[sugestionIndex].name);
      returnData(sugestionData[sugestionIndex].name);
      setSugestionIndex(0);
      setSugestionsActive(false);
    }
  };

  const handleClick = (e) => {
    let text: string = e.target.innerText;
    // if (e.target.localName == 'li') text = e.target.innerText;
    // else text = e.target.parentNode.innerText;
    setSelectValue(text);
    returnData(text);
    setSugestionsActive(false);
  };

  return (
    <>
      <input
        type="search"
        className={`${inputStyle} ${showSugestions && 'mb-0'}`}
        value={selectValue}
        onChange={(e) => {
          setSelectValue(e.target.value);
          if (sugestionIndex > sugestionData.filter((i) => i.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1).length)
            setSugestionIndex(0);
          returnData(e.target.value);
        }}
        onFocus={() => setSugestionsActive(true)}
        // onBlur={(e) => {
        //   // console.log(e);
        //   setSugestionsActive(false);
        // }}
        onKeyDown={handleKeyDown}
        required
        disabled={data == null}
      />

      {showSugestions && <Sugestions />}
    </>
  );
}
