import React, { Component } from "react";
import { Button } from "reactstrap";
import ConnectMailAccountModal from "./components/ConnectMailAccountModal";
import { connect } from "react-redux";
import {
  MailSenderAction,
  MailGetDataAction,
  MailAccountDeleteAction,
  MailAccountUpdate,
} from "../../../redux/action/MailSenderAction";
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";

class MailAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
      modal: false,
      emailAddress: "",
      FullName: "",
      smtpPort: "587",
      smtpHost: "",
      smtpPassword: "",
      imapHost: "",
      imapPassword: "",
      imapPort: "993",
      user: null,
      accountId: null,
      flag: false,
    };
  }

  componentDidMount() {
    this.props.MailGetDataAction();
  }

  // Close modal
  closeModal = () => {
    this.setState({ modal: false });
  };

  // Connect mail account
  connectMailAccount = (mailAccount) => {
    console.log("Connecting mail account : ", mailAccount);

    // Close modal
    this.setState({ modal: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    this.setState({
      modal: !this.state.modal,
      hide: false,
      flag: false,
    });
    const mailData = {
      email: this.state.emailAddress,
      full_name: this.state.FullName,
      smtp_port: this.state.smtpPort,
      smtp_host: this.state.smtpHost,
      smtp_password: this.state.smtpPassword,
      smtp_username: this.state.emailAddress,
      imap_port: this.state.imapPort,
      imap_host: this.state.imapHost,
      imap_password: this.state.imapPassword,
      imap_username: this.state.emailAddress,
    };
    if (this.state.flag) {
      mailData.user = this.state.user;
      this.props.MailAccountUpdate(mailData, this.state.accountId);
    } else {
      this.props.MailSenderAction(mailData);
    }
  };

  deleteMailAccount = (id) => {
    this.props.MailAccountDelete(id);
  };

  handleToggle = (index) => {
    this.setState({ hide: index });
  };

  editDataModel = (data, e) => {
    this.setState({ modal: true });
    this.setState({
      emailAddress: data.email,
      FullName: data.full_name,
      smtpPort: data.smtp_port,
      smtpHost: data.smtp_host,
      smtpPassword: data.smtp_password,
      imapHost: data.imap_port,
      imapPassword: data.imap_password,
      imapPort: data.imap_port,
      accountId: data.id,
      user: data.user,
      flag: true,
    });
  };

  render() {
    const { mailGetData } = this.props;
    const { hide } = this.state;
    const data = [
      {
        name: "ISSUES",
        count: 0,
        persent: 0,
      },
      {
        name: "GOOLE",
        count: 1,
        persent: 100,
      },
      {
        name: "MICROSOFT",
        count: 0,
        persent: 0,
      },
      {
        name: "SMTP",
        count: 0,
        persent: 0,
      },
    ];

    return (
      <div className="mail-account-container">
        <PageHeader
          current="Mail Accounts"
          parent="Mail Accounts"
          showStatus={true}
          showDataStatus={data}
        />
        <PageContainer title="Mail Accounts">
          <p>Your team has 1 mail accounts</p>
          <Button
            onClick={(e) => {
              e.preventDefault(), this.setState({ modal: true });
            }}
            className="btn-icon"
            color="danger"
            type="button"
          >
            <span className="btn-inner--icon">
              <i className="fa fa-plus" />
            </span>
          </Button>
          <div>
            <div style={{ display: "flex" }}>
              <div>
                {mailGetData &&
                  mailGetData != "mail accounts not available" &&
                  mailGetData.map((item, index) => {
                    return (
                      <div key={index}>
                        <div style={{ display: "flex", color: "black" }}>
                          <h1 style={{ fontSize: "20px", paddingLeft: "20px" }}>
                            {item.email}
                          </h1>
                          &nbsp;&nbsp;
                          <div
                            className="list-wrapper"
                            style={{ position: "relative" }}
                          >
                            <div
                              onClick={() => {
                                this.handleToggle(index);
                              }}
                            >
                              <i
                                className="fas fa-ellipsis-v mt-2"
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  marginTop: "0px",
                                }}
                              ></i>
                            </div>
                            {hide === index && (
                              <ul
                                className="mail-account-edit-list"
                                style={{ listStyleType: "none" }}
                              >
                                <li
                                  onClick={(e) => {
                                    this.editDataModel(item, e);
                                  }}
                                >
                                  Edit Connection{" "}
                                </li>
                                <li
                                  onClick={() =>
                                    this.deleteMailAccount(item.id)
                                  }
                                >
                                  Delete
                                </li>
                              </ul>
                            )}
                          </div>
                        </div>
                        <div
                          key={index}
                          style={{
                            boxShadow:
                              "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
                            width: 400,
                            height: 300,
                            margin: 20,
                            padding: 10,
                          }}
                        >
                          <div>{item.full_name}</div>
                          <div>{item.email}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <ConnectMailAccountModal
            isOpen={this.state.modal}
            close={this.closeModal}
            connectMailAccount={this.connectMailAccount}
          />
        </PageContainer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("**************mailgetdata************",state.MailGetDataReducer.mailGetData)
  return {
    mailGetData: state.MailGetDataReducer.mailGetData,
    mailAccountId: state.MailGetDataReducer.mailAccountId,
  };
};
const mapDispatchToProps = (dispatch) => ({
  MailSenderAction: (mailData) => {
    dispatch(MailSenderAction(mailData));
  },
  MailGetDataAction: () => {
    dispatch(MailGetDataAction());
  },
  MailAccountDelete: (id) => {
    dispatch(MailAccountDeleteAction(id));
  },
  MailAccountUpdate: (data, id) => {
    dispatch(MailAccountUpdate(data, id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MailAccounts);
