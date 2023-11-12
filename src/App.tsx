import React, { useState, useEffect } from 'react';




const App = () => {
  const [data, setData] = useState<any>();
  const [setQuery, setSetQuery] = useState('');
  const [details, setDetails] = useState({ name: "", image: "", year: "", feature: "" })

  useEffect(() => {
    if (data !== undefined && data.name && data.image && data.year && data.feature) setDetails({
      name: data.name, image: data.image.src, year: data.year, feature: data.feature
    })
  }, [data])

  const getData = (q) => {
    fetch(`http://localhost:8000/api/${q}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setSetQuery('');
      });
  };


  const handleChange = (e) => {
    setSetQuery(e.target.value);
  };

  const handleBlur = (e) => {
    setSetQuery(e.target.value)
    getData(setQuery);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData(setQuery);
  };

  const [isPlaying, setPlaying] = useState(false)


  return (
    <div className="bg-black w-full h-[100vh] flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-1 relative">
        <button className="absolute right-8 top-8 px-2 py-1 font-bold text-xl rounded-full bg-red-600" onClick={() => setPlaying(false)}> X </button>
        {data?.type == "feature" ? <iframe className={`w-full h-full ${isPlaying ? 'visible' : 'hidden'}`} src={`https://vidsrc.to/embed/movie/${data?.id}`}></iframe> :
          <iframe className={`w-full h-full ${isPlaying ? 'visible' : 'hidden'}`} src={`https://vidsrc.to/embed/tv/${data?.id}/`}></iframe>}
      </div>
      <form
        onSubmit={handleSubmit}
        method="GET"
        className="w-full h-auto py-5 border-t-2 border-t-red-400 px-10 relative"
      >
        {/* {data && <Details data={{name: data.name as string, image: data.image as string, year: data.year as string, feature: data.feature as string}} />} */}
        {data && <div
          className={`w-full h-auto text-white bg-stone-800 rounded p-10 absolute top-0 left-0 -translate-y-full ${isPlaying && 'hidden'} `}
          id="container"
        >
          <div className="w-full h-full flex justify-around gap-10">
            <div className="w-[350px] h-[400px] flex-1">
              <img
                src={data?.image?.src}
                className="w-full h-full object-contain"
                id="containerImg"
                alt="Movie Poster"
              />
            </div>
            <div className="w-full h-full flex-1 flex flex-col gap-2">
              <h1 className="uppercase text-xl font-bold" id="containerTitle">
                {data?.name}
              </h1>
              <p className="text-sm" id="containerYear">
                {data?.year}
              </p>
              <p className="text-sm" id="containerFeature">
                {data?.type}
              </p>
              <button
                onClick={() => setPlaying((pre) => !pre)}
                className="px-5 py-2 rounded-2xl bg-stone-600 text-white uppercase font-bold"> Play </button>
            </div>
          </div>
        </div>}


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
