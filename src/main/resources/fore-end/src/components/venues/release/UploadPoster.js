/**
 * Created by a297 on 18/3/14.
 */
import React from 'react';
import { connect } from 'dva';
import { Upload, Button, Icon, message } from 'antd';


class UploadPoster extends React.Component {

  state = {
    fileList: [],
    // fileList: [{
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'http://www.baidu.com/xxx.png',
    // }],
  };

  beforeUpload = (file, fileList) => {
    console.log('before upload: ' , file.size);
    const fileSize = file.size;
    const maxSize = 1048576;
    if (fileSize > maxSize) {
      message.error('上传失败！文件大小不得超过1M。', 2);
      return false;
    }
    message.success('上传成功！', 2);
    return true;
  };
  handleChange = (info) => {
    console.log('======= handle change in upload: ', info);
    let fileList = info.fileList;

    // 1. Limit the number of uploaded files
    //    Only to show one recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });
    this.props.onChange(info.fileList);
    this.setState({ fileList });
  };

  render() {
    const props = {
      action: '/api/venues/preUploadPoster',
      onChange: this.handleChange,
      accept: 'image/*',
      beforeUpload: this.beforeUpload
    };
    return (
      <Upload {...props} fileList={this.state.fileList}>
        <Button>
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    );
  }
}
export default connect()(UploadPoster);
