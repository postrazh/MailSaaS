import React from "react";
import { Container, Row, Col, Input, FormGroup, Label } from "reactstrap";
import ReactQuill from "react-quill";
import { parseCSVRow, parseTemplate } from '../../../../../utils/Utils';

export default class DripPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitDays: 1,
      subject: "",
      email_body: "",
    };
  }

  getPlural = (val, unit) => {
    if (!val) return unit;
    
    if (val > 1) {
      return val + ' ' + unit + 's';
    } else {
      return val + ' ' + unit;
    }
  }

  render() {
    const { index, onDelete, data, preview, replacement} = this.props;

    return (
      <Container fluid>
        <Row className="mt-3">
          <Col md={12} className="alignRight">
            <Row>
              <h2 className="display-6">Drips</h2>
              {onDelete && 
                <div
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => onDelete(index)}
                  style={{position: 'absolute', right: 0, top: 10}}
                >
                  <i style={{ paddingRight: 5 }} className="fa">
                    &#xf014;
                  </i>
                  DELETE
                </div>
              }
            </Row>
            {preview ? 
              <Row>
                <i className="fas fa-stopwatch" aria-hidden="true"></i><span>&nbsp;&nbsp;Drip {this.getPlural(data.waitDays, 'day')} later</span>
              </Row>
              :
              <>
                <Row>
                  <Col>
                    <FormGroup className="row align-center">
                      <Label
                        className="form-control-label"
                        htmlFor="iputWaitDays"
                      >
                      <i className="fas fa-stopwatch" aria-hidden="true"></i>&nbsp; Wait X days:&nbsp;
                      </Label>
                      <Col md="2">
                        <Input
                          defaultValue={data.waitDays}
                          className="form-control-sm"
                          id="iputWaitDays"
                          type="number"
                          onChange={(e) => {
                            this.setState({ waitDays: e.target.value });
                            data.waitDays = e.target.value;
                          }}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </>
            }
            
            <Row className="mt-0">
              <Input
                defaultValue={preview && replacement ? parseTemplate(data.subject, replacement) : data.subject}
                onChange={(e) => {
                  this.setState({ subject: e.target.value });
                  data.subject = e.target.value;
                }}
                type="text"
                className="form-control-sm"
                name="subject"
                placeholder="Subject"
                required={!preview}
                disabled={preview}
              />
            </Row>
            <Row>
              <Col className="p-0">
                <ReactQuill
                  defaultValue={preview && replacement ? parseTemplate(data.email_body, replacement) : data.email_body}
                  onChange={(value) => {
                    this.setState({ email_body: value });
                    data.email_body = value;
                  }}
                  theme={preview ? "bubble" : "snow"}
                  className="Quill_div"
                  readOnly={preview}
                  modules={{
                    toolbar: [
                      ["bold", "italic"],
                      ["link", "blockquote", "code", "image"],
                      [
                        {
                          list: "ordered",
                        },
                        {
                          list: "bullet",
                        },
                      ],
                    ],
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
