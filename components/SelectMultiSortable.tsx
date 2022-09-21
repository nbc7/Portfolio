import { useState } from 'react';

interface selectProps {
  data: Array<any>;
  returnData?: (data: string[]) => void;
  returnNewData?: (data: string[]) => void;
}

export function SelectMultiSortable({ data, returnData, returnNewData }: selectProps) {
  const [sugestionsActive, setSugestionsActive] = useState(false);
  const [sugestionIndex, setSugestionIndex] = useState(0);
  const [selectValue, setSelectValue] = useState('');
  const [addedTags, setAddedTags] = useState([]);
  const [newTags, setNewTags] = useState([]);

  const inputStyle = 'text-black w-[250px] sm:w-[500px] md:w-[628px] lg:w-[884px] rounded px-2 mb-4';

  const sugestionData = data?.filter((i) => {
    // return i.name.indexOf(selectValue) > -1;
    return i.name.toLowerCase().indexOf(selectValue.toLowerCase()) > -1;
    // return i.toLowerCase().startsWith(itemname.toLowerCase());
    // return i.toLowerCase().includes(itemname.toLowerCase());
  });

  const showSugestions: boolean = sugestionsActive && sugestionData.length > 0;

  const Sugestions = () => {
    return (
      <ul className="bg-white rounded border text-cinza-600 mb-4">
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

  const Tags = () => {
    return (
      <div className="flex flex-wrap">
        {addedTags.map((value, index) => {
          return (
            <div key={index} className="bg-azul-500 text-cinza-900 w-fit flex rounded-md shadow-card mr-1 mb-2">
              <span className="px-1">{value}</span>
              <div className="border-l border-l-cinza-600 my-1"></div>
              <button
                type="button"
                className="px-1 font-bold hover:bg-laranja-500 hover:rounded-r-md"
                onClick={() => {
                  addedTags.splice(addedTags.indexOf(value), 1);
                  setAddedTags([...addedTags]);
                  returnData(addedTags);

                  if (newTags.indexOf(value) >= 0) {
                    newTags.splice(newTags.indexOf(value), 1);
                    setNewTags([...newTags]);
                    returnNewData(newTags);
                  }
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const handleKeyDown = (e) => {
    // e.preventDefault();

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
      let selectedTag: string;

      if (sugestionData.length === 0) selectedTag = selectValue;
      else selectedTag = sugestionData[sugestionIndex].name;

      if (addedTags.indexOf(selectedTag) != -1) return;
      // if (addedTags.indexOf(selectValue) != -1 || selectValue === '') return;

      if (sugestionData.length === 0 /*sugestionData.indexOf(selectValue) < 0*/) {
        //add to array of tags to add to the database

        setNewTags([...newTags, selectedTag]);
        newTags.push(selectedTag);
        returnNewData(newTags);
      }
      // if (sugestionData.length > 0) setAddedTags([...addedTags, sugestionData[sugestionIndex].name]);
      setAddedTags([...addedTags, selectedTag]);
      addedTags.push(selectedTag);
      returnData(addedTags);

      setSelectValue('');
      setSugestionIndex(0);
      // setSugestionsActive(false);
    }
  };

  const handleClick = (e) => {
    let text: string = e.target.innerText;
    // if (e.target.localName == 'li') text = e.target.innerText;
    // else text = e.target.parentNode.innerText;
    if (addedTags.indexOf(text) != -1) {
      setSugestionsActive(false);
      return;
    }

    setSelectValue(text);
    setAddedTags([...addedTags, text]);
    addedTags.push(text);
    returnData(addedTags);
    // returnData(text);
    setSelectValue('');
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
          // returnData(e.target.value);
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

      {addedTags.length > 0 && <Tags />}
    </>
  );
}
