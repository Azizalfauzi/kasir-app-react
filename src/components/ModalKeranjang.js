import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHandle,
  handleSubmit,
  total_harga,
  handleSubmitDeletePesanan,
}) => {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.product.nama} :{" "}
            <strong>(Rp.{numberWithCommas(total_harga)})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Total Harga :</Form.Label>
              <p>
                <strong>
                  Rp.{numberWithCommas(keranjangDetail.total_harga)}
                </strong>
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Jumlah Pesanan :</Form.Label>
              <br />
              <Row className="justify-content-md-center">
                <Row xs="auto">
                  <Col>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => tambah()}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Col>
                  <Col>
                    <strong>{jumlah}</strong>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => kurang()}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>
                  </Col>
                </Row>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                as="textarea"
                name="keterangan"
                placeholder="Contoh : Pedas,Nambah Porsi dll..."
                value={keterangan}
                onChange={(event) => changeHandle(event)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleSubmitDeletePesanan(keranjangDetail.id)}
          >
            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Data Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data Tidak Ditemukan</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;
