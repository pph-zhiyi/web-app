import React, {Component} from 'react';
import {Button, Form, Icon, Input, message as Message, Spin} from 'antd';
import {commitContent, queryCauserieList} from "../../../services/causerieService";

const {TextArea} = Input;

class CommentEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: false
        };
    }

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    handleSubmit = () => {
        const {value} = this.state;
        const {jti, addComment} = this.props;
        if (!value) {
            return;
        }

        this.setState({loading: true});
        commitContent({content: value, user: jti}).then(res => {
            setTimeout(() => {
                this.setState({loading: false, value: ''});
            }, 1000);
            const {success, data, message} = res;
            if (success) {
                queryCauserieList({user: jti, pageNo: 1, pageSize: 1})
                    .then(res => {
                        addComment(res.data.data[0]);
                        Message.info(data);
                    })
            } else {
                Message.error(message);
            }
        }).catch((e) => {
            Message.error("请求结果异常");
        });
    };

    render() {
        const {loading, value} = this.state;
        return (
            <Spin
                tip="加载中..."
                indicator={<Icon type="loading" style={{fontSize: 24}} spin/>}
                spinning={loading}
            >
                <Form.Item>
                    <TextArea
                        placeholder="随便写点儿什么吧....."
                        rows={5}
                        onChange={this.handleChange}
                        value={value}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        icon="cloud-upload"
                        htmlType="submit"
                        onClick={this.handleSubmit}
                        type="primary"
                        ghost
                    >
                        发布
                    </Button>
                </Form.Item>
            </Spin>
        );
    }
}

export default CommentEditor;