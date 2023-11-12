import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState({});
  const [setQuery, setSetQuery] = useState('');

  const getData = (q) => {
    fetch(`/api/${q}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setSetQuery('');
        updateDetails(data);
      });
  };

  const handleChange = (e) => {
    setSetQuery(e.target.value);
    closeContainer();
  };

  const handleBlur = (e) => {
    getData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData(setQuery);
  };

  const updateDetails = (details) => {
    const container = document.getElementById('container');
    if (!details) {
      container.setAttribute(
        'class',
        'w-full h-[200px] text-white bg-stone-800 rounded p-10 absolute top-0 left-0 -translate-y-full hidden'
      );
      return;
    }

    container.setAttribute(
      'class',
      'w-full h-[200px] text-white bg-stone-800 rounded p-10 absolute top-0 left-0 -translate-y-full'
    );

    const title = document.getElementById('containerTitle');
    const year = document.getElementById('containerYear');
    const feature = document.getElementById('containerFeature');
    const img = document.getElementById('containerImg');

    title.innerHTML = details.name;
    year.innerHTML = `Year: ${details.year}`;
    feature.innerHTML = `Feature: ${details.feature}`;
    img.setAttribute('src', details.image.src);
  };

  const closeContainer = () => {
    document.getElementById('container').setAttribute(
      'class',
      'w-full h-[200px] text-white bg-stone-800 rounded p-10 absolute top-0 left-0 -translate-y-full hidden'
    );
  };

  return (
    <div className="bg-black w-full h-[100vh] flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-1"></div>
      <form
        onSubmit={handleSubmit}
        method="GET"
        className="w-full h-auto py-5 border-t-2 border-t-red-400 px-10 relative"
      >
        <div
          className="w-full h-[200px] text-white bg-stone-800 rounded p-10 absolute top-0 left-0 -translate-y-full"
          id="container"
        >
          <div className="w-full h-full flex justify-around gap-10">
            <div className="w-[500px] h-[600px] flex-1">
              <img
                className="w-full h-full object-cover"
                id="containerImg"
                alt="Movie Poster"
              />
            </div>
            <div className="w-full h-full flex-1">
              <h1 className="uppercase font-bold" id="containerTitle">
                Title
              </h1>
              <p className="text-sm" id="containerYear">
                Year:
              </p>
              <p className="text-sm" id="containerFeature">
                Feature:
              </p>
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search for movie"
          value={setQuery}
          onBlur={handleBlur}
          onChange={handleChange}
          className="w-full p-5 h-auto bg-stone-900 text-slate-50 text-sm font-bold"
        />
      </form>
    </div>
  );
};

export default App;
