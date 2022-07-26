import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import ResultTotal from "./ResultTotal";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class ResultCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      total_harga: 0,
    };
  }
  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      total_harga: menuKeranjang.total_harga,
    });
  };
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };
  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      total_harga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        total_harga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };
  changeHandle = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();
    const dataKeranjang = {
      jumlah: this.state.jumlah,
      total_harga: this.state.total_harga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
    axios
      .put(
        API_URL + "keranjangs/" + this.state.keranjangDetail.id,
        dataKeranjang
      )
      .then((res) => {
        this.props.getListUpdate();
        swal({
          title: "Update Pesanan!",
          text:
            "Data pesanan berhasil di update :" + dataKeranjang.product.nama,
          icon: "success",
          buttons: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleSubmitDeletePesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        this.props.getListUpdate();
        swal({
          title: "Hapus Pesanan!",
          text:
            "Data pesanan berhasil di hapus :" +
            this.state.keranjangDetail.product.nama,
          icon: "error",
          buttons: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Keranjang</strong>
          <hr />
        </h4>
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item
                  key={menuKeranjang.id}
                  onClick={() => this.handleShow(menuKeranjang)}
                >
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p>Rp.{numberWithCommas(menuKeranjang.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp.{numberWithCommas(menuKeranjang.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ModalKeranjang
                handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandle={this.changeHandle}
                handleSubmit={this.handleSubmit}
                handleSubmitDeletePesanan={this.handleSubmitDeletePesanan}
              />
            </ListGroup>
          </Card>
        )}
        <ResultTotal keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
