import React from 'react'
import {gql, useQuery} from '@apollo/client'


export default function BookList (){

    const { loading, error, data } = useQuery(gql`
    {
        books{
            name
            id
        }
    }
    `);

    console.log(data)

    // if (loading) console.log("loading");
    if (error) console.log(`Error ${error}`)
    if (data) console.log(`data ${data}`)

      return(
        <div className="main">
            <ul id="bok-list">
                <li>Book name</li>
            </ul>
      </div>
      )
  }
