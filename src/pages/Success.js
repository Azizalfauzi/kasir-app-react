import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";

import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";
import axios from "axios";

export default class Success extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/success.png" width={500} />
        <h2>Sukses Pesan Makanan</h2>
        <p>Terimakasih Telah Memesan</p>
        <Button variant="dark" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
