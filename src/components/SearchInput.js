import React from 'react';
import { Input } from 'antd';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons'
class SearchInput extends React.PureComponent {
    state = {
        value: '',
        focus:false
    }
    onChangeValue = (e) => {
        this.setState({ value: e.target.value });
    }
    onFocus = (e) => {
        this.setState({ focus: true })
    }
    onBlur = (e) => {
        this.setState({ focus: false })
    }
    render() {
        const { value } = this.state;
        return (
            <div style={this.props.style}>
                <Input
                    placeholder="Search"
                    prefix={this.state.focus? <ArrowLeftOutlined style={{ color:!this.state.focus?'rgba(0,0,0,.25)':'#1890ff' }} />:<SearchOutlined style={{ color:!this.state.focus?'rgba(0,0,0,.25)':'#1890ff' }} />}
                    value={value}
                    onChange={this.onChangeValue}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
            </div>
        );
    }
}
export default SearchInput;