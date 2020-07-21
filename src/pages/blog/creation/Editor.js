import React, {useState} from 'react'
import {Button, Divider, Upload} from 'antd'
import {EyeOutlined, FileImageOutlined} from '@ant-design/icons'
import BraftEditor from 'braft-editor'
import {ContentUtils} from 'braft-utils'

import 'braft-editor/dist/index.css'

const Editor = () => {
    const [content, setContent] = useState(BraftEditor.createEditorState(null));
    const [outputHTML, setOutputHTML] = useState(null);

    const handleChange = (v) => {
        setContent(v);
        setOutputHTML(v.toHTML())
    };

    const uploadHandler = (param) => {
        if (!param.file) {
            return false
        }

        setContent(ContentUtils.insertMedias(content, [{
            type: 'IMAGE',
            // 这里的 url 替换为实际调用上传 API 返回的图片链接
            url: 'http://wx2.sinaimg.cn/large/705793b8gy1g503pv9yazj20jy0imgmf.jpg'
        }]));
    };

    const preview = () => {
        if (window.previewWindow) {
            window.previewWindow.close()
        }

        window.previewWindow = window.open();
        window.previewWindow.document.write(buildPreviewHtml());
        window.previewWindow.document.close()
    };

    const buildPreviewHtml = () => {
        return `
              <!Doctype html>
              <html lang="">
                <head>
                  <title>Preview Content</title>
                  <style>
                    html,body{
                      height: 100%;
                      margin: 0;
                      padding: 0;
                      overflow: auto;
                      background-color: #f1f2f3;
                    }
                    .container{
                      box-sizing: border-box;
                      width: 1000px;
                      max-width: 100%;
                      min-height: 100%;
                      margin: 0 auto;
                      padding: 30px 20px;
                      overflow: hidden;
                      background-color: #fff;
                      border-right: solid 1px #eee;
                      border-left: solid 1px #eee;
                    }
                    .container img,
                    .container audio,
                    .container video{
                      max-width: 100%;
                      height: auto;
                    }
                    .container p{
                      white-space: pre-wrap;
                      min-height: 1em;
                    }
                    .container pre{
                      padding: 15px;
                      background-color: #f1f1f1;
                      border-radius: 5px;
                    }
                    .container blockquote{
                      margin: 0;
                      padding: 15px;
                      background-color: #f1f1f1;
                      border-left: 3px solid #d1d1d1;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">${content.toHTML()}</div>
                </body>
              </html>
        `;
    };

    const extendControls = [
        {
            key: 'custom-button',
            type: 'component',
            component: (
                <Button
                    className="control-item button upload-button"
                    data-title="内容预览"
                    onClick={preview}
                >
                    <EyeOutlined/>
                </Button>
            ),
        },
        {
            key: 'antd-uploader',
            type: 'component',
            component: (
                <Upload
                    accept="image/*"
                    showUploadList={false}
                    customRequest={uploadHandler}
                >
                    <Button
                        className="control-item button upload-button"
                        data-title="插入图片"
                    >
                        <FileImageOutlined/>
                    </Button>
                </Upload>
            )
        }
    ];

    return (
        <>
            <div>
                <div className="editor-wrapper">
                    <BraftEditor
                        value={content}
                        onChange={handleChange}
                        extendControls={extendControls}
                        contentStyle={{height: 600}}
                    />
                </div>
                <Divider/>
                <div>
                    <h4>源码：</h4>
                    <div
                        className="output-content"
                    >
                        {outputHTML}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Editor;