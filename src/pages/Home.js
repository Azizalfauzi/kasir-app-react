import { Col, Container, Row } from "react-bootstrap";
import {
  ListCategories,
  ResultCategories,
  MenusComponents,
} from "../components";
import React, { Component } from "react";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categorySelect: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categorySelect)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((err) => {
        console.log(err);
      });
    this.getListUpdate();
  }
  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }
  getListUpdate = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  changeCategory = (value) => {
    this.setState({
      categorySelect: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  addKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        console.log(res.data.length);
        if (res.data.length === 0) {
          const dataKeranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjangs", dataKeranjang)
            .then((res) => {
              this.getListUpdate();
              swal({
                title: "Success!",
                text: "Berhasil menambahkan :" + dataKeranjang.product.nama,
                icon: "success",
                buttons: false,
                timer: 2000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const dataKeranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, dataKeranjang)
            .then((res) => {
              swal({
                title: "Success!",
                text: "Berhasil menambahkan :" + dataKeranjang.product.nama,
                icon: "success",
                buttons: false,
                timer: 2000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { menus, categorySelect, keranjangs } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              categorySelect={categorySelect}
            />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <MenusComponents
                        key={menu.id}
                        menu={menu}
                        addKeranjang={this.addKeranjang}
                      />
                    ))}
                </Row>
              </h4>
            </Col>
            <ResultCategories
              keranjangs={keranjangs}
              {...this.props}
              getListUpdate={this.getListUpdate}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
