import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";
import swal from "sweetalert";

export default class ResultTotal extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };
    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      swal({
        title: "Success!",
        text: "Berhasil menambahkan pesanan",
        icon: "success",
        buttons: false,
        timer: 2000,
      });
    });
  };
  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <>
        {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <Row>
                <Col>
                  <h4>Total Harga :</h4>
                </Col>
                <Col>
                  <h4>
                    {" "}
                    <strong className="float-right mb-5">
                      Rp. {numberWithCommas(totalBayar)}
                    </strong>
                  </h4>
                </Col>
              </Row>
              <div className="d-grid gap-2">
                <Button
                  variant="dark"
                  size="lg"
                  className="mb-2 mt-4 mr-2"
                  onClick={() => this.submitTotalBayar(totalBayar)}
                  as={Link}
                  to="/success"
                >
                  <FontAwesomeIcon icon={faShoppingBag} />{" "}
                  <strong>Bayar Sekarang</strong>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        {/* Mobile */}
        <div className="dsm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <Row>
                <Col>
                  <h4>Total Harga :</h4>
                </Col>
                <Col>
                  <h4>
                    {" "}
                    <strong className="float-right mb-5">
                      Rp. {numberWithCommas(totalBayar)}
                    </strong>
                  </h4>
                </Col>
              </Row>
              <div className="d-grid gap-2">
                <Button
                  variant="dark"
                  size="lg"
                  className="mb-2 mt-4 mr-2"
                  onClick={() => this.submitTotalBayar(totalBayar)}
                  as={Link}
                  to="/success"
                >
                  <FontAwesomeIcon icon={faShoppingBag} />{" "}
                  <strong>Bayar Sekarang</strong>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
