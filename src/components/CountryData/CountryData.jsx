import React from "react";
import styles from "./CountryData.module.css";
import refreshIcon from "assets/refresh.png";
import { useState, useEffect } from "react";
import { Roller as Spinner } from "react-css-spinners";

function CountryData() {
  const [countryInfo, setCountryInfo] = useState([]);
  useEffect(() => {
    getCountryData();
  }, []);
  async function getCountryData(req, res, region, URL) {
    region = "Asia";
    URL = `https://restcountries.eu/rest/v2/region/${region}`;
    req = await fetch(URL);
    res = await req.json();
    setCountryInfo(res);
  }

  const InfoTable = () => {
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Capital</th>
            <th>Flag</th>
            <th>Region</th>
            <th>Subregion </th>
            <th>Population</th>
            <th>Borders</th>
            <th>Languages</th>
          </tr>
          {countryInfo.map((info, index) => {
            const {
              name,
              capital,
              region,
              subregion,
              population,
              borders,
              languages,
            } = info;
            return (
              <tr key={index}>
                <td>{name}</td>
                <td>{capital}</td>

                <td>
                  <img src={info.flag} alt="Flag" height="20" width="20" />
                </td>
                <td>{region}</td>
                <td>{subregion}</td>
                <td>{population}</td>
                <td>
                  {borders.length === 0
                    ? "None"
                    : borders.map((border, index) => (
                        <span
                          key={index}
                          style={{
                            margin: "0.4em",
                            borderBottom: "1px #242424 solid",
                          }}
                        >
                          {border}
                        </span>
                      ))}
                </td>
                <td>
                  {languages.map((language, index) => (
                    <span
                      style={{
                        margin: "0.4em",
                        borderBottom: "1px #242424 solid",
                      }}
                      key={index}
                    >
                      {language.name}
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  return (
    <div className={styles.wrapper}>
      <p>Click below to refresh the data!</p>
      <button onClick={() => window.location.reload()}>
        Refresh
        <img src={refreshIcon} alt="Refresh Icon" />
      </button>
      <div className={styles.dataContainer}>
        {countryInfo.length === 0 ? (
          <>
            <p>Fetching data...</p>
            <Spinner className={styles.spinner} color="#242424" size={35} />
          </>
        ) : (
          <InfoTable />
        )}
      </div>
    </div>
  );
}

export default CountryData;
