import React, { useState, useEffect } from "react";
import Datatable from './qq'
// import DataTable from "./datatable";
require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function App() {
    const [data, setData] = useState([]);
    const [q, setQ] = useState("");

    useEffect(() => {
        fetch("http://dummy.restapiexample.com/api/v1/employees")
            .then((response) => response.json())
            .then((json) => setData(json));
    }, []);

    function search(rows) {
        const colums = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) =>
            colums.some(
                (column) =>
                    row[column].toString().toLowerCase().indexOf(q.toLocaleLowerCase()) > -1
            )
        );
    }

    return (
        <div>
            <div>
                <input type="text" value={q} onChange={(e) => setQ(e.target.value)}></input>
            </div>
            <div>
                <Datatable data={search(data)} />
            </div>
        </div>
    )
}