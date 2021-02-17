import React, { Component } from 'react'
import { Container, Row, Button, Input, Col, Form, Nav } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom';
import { EditorState } from 'draft-js';
import FollowUpPage from './FollowUpPage';
import Drips from './Drips'
import LinkClicksPage from './LinkClicksPage'
import { connect } from 'react-redux';
import { CampaignComposeAction } from '../../../redux/action/CampaignAction';
import { Alert } from 'reactstrap';
class CampaignCompose extends Component {
    constructor() {
        super();
        this.state = {
            subject: '',
            email_body: '',
            editorState: EditorState.createEmpty(),
            inputListFollow: [],
            inputListDrips: [],
            inputListLinkClick: [],
            dataObj: {},
            arra: [],
            followUpData: [],
            dripData: [],
            onClickData: [],
            dripPageObject: {},
            normalData: {},
            isOpen:false
        }
        this.counter = 0
    }

    handleSubject = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        Object.assign(this.state.normalData, { 'subject': e.target.value })
    }
    onAddBtnClickFollow = () => {
        const inputListFollow = this.state.inputListFollow;
        this.counter = this.counter + 1
        this.state.counter === 0 ? null : this.state.followUpData.push(this.state.dataObj)
        this.setState({
            dataObj: {},
            inputListFollow: inputListFollow.concat(<FollowUpPage msgBody={this.state.msgBody} followUpPageObject={this.state.dataObj} normalSubject={this.state.subject} key={inputListFollow.length} />),
        });
    }
    onAddBtnClickDrips = () => {
        const inputListDrips = this.state.inputListDrips;
        this.counter = this.counter + 1
        this.state.counter === 0 ? null : this.state.dripData.push(this.state.dataObj)
        this.setState({
            dataObj: {},
            inputListDrips: inputListDrips.concat(<Drips dripPageObject={this.state.dataObj} key={inputListDrips.length} />)
        });
    }
    onAddBtnClickLinkClick = () => {
        const inputListLinkClick = this.state.inputListLinkClick;
        const inputListDrips = this.state.inputListDrips;
        this.counter = this.counter + 1
        this.state.counter === 0 ? null : this.state.onClickData.push(this.state.dataObj)
        this.setState({
            dataObj: {},
            inputListLinkClick: inputListLinkClick.concat(<LinkClicksPage onClickPageObject={this.state.dataObj} key={inputListLinkClick.length} />)
        });
    }
    onEditorStateChange = (editorState) => {
        this.setState({ editorState })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.email_body===''){
         this.setState({
             isOpen:true
         })   
        }
        else{
        Object.assign(this.state.normalData, { 'campaign': this.props.history.location.state.mailGetData && this.props.history.location.state.mailGetData[0].id })
        let data = {
            normal: this.state.normalData,
            follow_up: this.state.followUpData,
            drips: this.state.dripData,
            onLinkClick: this.state.onClickData
        }
        this.props.CampaignComposeAction(data,this.props)
    }

    }
    onChange = (e) => {
        this.setState({ msgBody: e.blocks[0].text })
    }
    handleMsgBody = (e) => {
        this.setState({
            email_body: e.blocks[0].text,
            isOpen:false
        })
        Object.assign(this.state.normalData, { 'email_body': e.blocks[0].text })
    }
    
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <div className='main-view'>
                    <Form onSubmit={this.handleSubmit} >
                        <Container fluid>
                            <Row style={{ width: '100%', borderBottom: "1px solid #dedede" }}>
                                <Col style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className='logo_div' style={{ display: 'flex', alignItems: 'center' }}>
                                        <div><img src={STATIC_FILES.mailsaas_logo_32}></img>
                                            <span style={{ color: 'black', fontSize: '20px' }}>MailSaaaS</span></div>
                                    </div>
                                </Col>
                                <Col >
                                    <h1 style={{ textAlign: 'center', fontSize: '60px', color: "#333333" }}>New Campaign</h1>
                                </Col>
                                <Col style={{ display: "flex", flexDirection: "row-reverse" }}>
                                    <div className='mt-3'>
                                        <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                            <span><i className="fa fa-question-circle-o fa-lg" aria-hidden="true"></i></span>
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ width: '100%', borderBottom: "1px solid #dedede" }}>
                                <Col style={{ display: "flex" }}><Nav className='mx-auto' navbar>
                                    <Row className='mx-auto' style={{ width: '100%' }}>
                                        <ul style={{ listStyleType: 'none', display: 'flex' }}>
                                            <li className='mr-3 ml-3'><Link to="/app/admin/CampaignStart">START</Link></li>
                                            <li className='mr-3 ml-3'><Link to="/app/admin/CampaignRecipient">RECIPICIENT</Link></li>
                                            <li className='mr-3 ml-3'><Link to="/app/admin/CampaignCompose">COMPOSE</Link></li>
                                            <li className='mr-3 ml-3'><Link to="/app/admin/CampaignPreview">PREVIEW</Link></li>
                                            <li className='mr-3 ml-3'><Link to="/app/admin/CampaignOptions">OPTIONS</Link></li>
                                            <li className='mr-3 ml-3'><Link to="/app/admin/CampaignSend">SEND</Link></li>
                                        </ul>
                                    </Row>
                                </Nav>
                                </Col>
                            </Row>
                            <Row>
                                <Col md='10' className='mx-auto'>
                                    <Row className="composeemail_heading">
                                        Compose the emails in this campaign
                                </Row>
                                    <Row className="mt-5">
                                        <div><button className='EditTest'><i className="fa fa-plus-circle" aria-hidden="true"></i> A/B TEST</button>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className='grand_parent'>
                                            <div className='input_field'>
                                                <Input type='text' className='in' name='subject' value={this.state.subject} onChange={this.handleSubject} placeholder='Subject' required />
                                                <div className='mt-3'>
                                                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                                        <span><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className='Editor_div'>
                                            <Editor
                                                className='editorDiv'
                                                editorState={editorState}
                                                toolbarClassName="rdw-storybook-toolbar"
                                                wrapperClassName="rdw-storybook-wrapper"
                                                editorClassName="rdw-storybook-editor"
                                                name='email_body'
                                                value={this.state.email_body}
                                                onChange={this.handleMsgBody}
                                                onEditorStateChange={this.onEditorStateChange}
                                                required
                                            />
                                        </div>
                                    </Row>
                                    <Row className='mt-5'>
                                        {this.state.inputListFollow}
                                    </Row>

                                    <Row>
                                        <Col className='mt-3'>
                                            <div className='Add_follow_up' onClick={this.onAddBtnClickFollow}>
                                                <i className='fa fa-plus'></i> &nbsp;ADD FOLLOW-UP<br />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {this.state.inputListDrips}
                                    </Row>
                                    <Row>
                                        <Col className='mt-3'>
                                            <div className='Add_follow_up' onClick={this.onAddBtnClickDrips}>
                                                <i className='fa fa-plus'></i> &nbsp;ADD DRIP<br />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {this.state.inputListLinkClick}
                                    </Row>
                                    <Row>
                                        <Col className='mt-3 mb-5'>
                                            <div className='Add_follow_up' onClick={this.onAddBtnClickLinkClick}>
                                                <i className='fa fa-plus'></i> &nbsp;ADD ON CLICK<br />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='mx-auto'>
                                        <Col md='3'><Button>CANCLE EDITS</Button></Col>
                                        <Col md='2'><Button className="newcampaign_button btn" type='submit' >NEXT<i className="fa fa-arrow-right" aria-hidden="true"></i></Button></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                    <div style={{display:'flex',justifyContent:'center',position:'absolute',bottom:0,right:10}}>
                        <Alert className="alert_" toggle={()=>{this.setState({isOpen:false})}}  isOpen={this.state.isOpen} color="warning">Initial message must have a body</Alert>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        campaign: state.StartCampaignReducer.startCampaignData && state.StartCampaignReducer.startCampaignData.id
    }
}
const mapDispatchToProps = (dispatch) => ({
    CampaignComposeAction: (data,props) => dispatch(CampaignComposeAction(data,props))
})
export default connect(mapStateToProps, mapDispatchToProps)(CampaignCompose);