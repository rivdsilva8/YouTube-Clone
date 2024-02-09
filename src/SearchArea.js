import React, { useState, useEffect, useContext } from "react";
import Results from "./Results.js";
import axios from "axios";
import * as AppConstant from "./AppConstants.js";
import useDropdown from "./useDropdown.js";
import ColorContext from "./ColorContext.js";

const SearchArea = () => {
  const [themeColor, setThemeColor] = useContext(ColorContext);
  const [keyword, setKeyword] = useState("motogp");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [order, OrderDropdown] = useDropdown("Order By", "relevance", [
    "date",
    "relevance",
    "rating",
    "title",
    "viewCount",
  ]);

  const [safeSearch, SafeSearchDropdown] = useDropdown("Safe Search", "none", [
    "moderate",
    "none",
    "strict",
  ]);

  const [advancedParams, setAdvancedParams] = useState(``);

  useEffect(() => {
    if (checked) {
      setAdvancedParams(`&order=${order}&safeSearch=${safeSearch}`);
    } else {
      setAdvancedParams(``);
    }
  }, [checked, order, safeSearch]);

  const requestSearch = () => {
    setLoading(true);
    axios

      .get(`${AppConstant.SEARCH_URL}&q=${keyword}${advancedParams}`)
      .then((res) => {
        const { items } = res.data;
        console.log(items);
        setVideos(items);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="search-area">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestSearch();
        }}
      >
        <label htmlFor="keyword">
          Search
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>

        <label htmlFor="advanced">
          Advanced Search
          <input
            type="checkbox"
            id="advance"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </label>

        {checked ? (
          <div>
            <OrderDropdown />
            <SafeSearchDropdown />
            <label htmlFor="themeColor">
              Theme ColorContext
              <select
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                onBlur={(e) => setThemeColor(e.target.value)}
              >
                <option value="#ad3v3e">Dark Red</option>
                <option value="darkblue">Dark Blue</option>
                <option value="green">Green</option>
                <option value="aqua">Aqua</option>
              </select>
            </label>
          </div>
        ) : null}
        <button style={{ backgroundColor: themeColor }}>Submit</button>
      </form>
      <Results videos={videos} loading={loading} />
    </div>
  );
};

export default SearchArea;
