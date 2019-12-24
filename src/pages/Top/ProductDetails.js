import React, {Component} from 'react';
import {Button, Drawer, Form, Icon, Input} from 'antd';
import XLSX from 'xlsx';
import moment from "moment";

const {TextArea} = Input;

const zh = {
    model: "产品型号",
    status: "量产状态",
    manufacturer: "对标厂家",
    standardType: "对标型号",
    function: "功能分类",
    formFactor: "安装形式",
    powerType: "AC/DC",
    plug: "输入插头",
    inputVoltage: "输入电压(V)",
    acceptableInputVoltage: "可承受输入电压范围（V）",
    frequency: "电源频率（Hz）",
    phase: "相位Phase",
    maximumInputCurrent: "最大输入电流(A)",
    maximumLineCurrent: "最大输入线电流（A）",
    deratedInputCurrent: "降额输入电流（A）",
    kva: "功率(kVA)",
    outputVoltage: "输出电压（V）",
    maximumTotalCurrentDraw: "最大汲取电流（A）",
    outletNumber: "插座数量",
    c13: "C13",
    c19: "C19",
    universal: "万用孔",
    gb10a: "国标10A",
    gb16a: "国标16A",
    gbSmallFive: "国标小五孔",
    bsEn: "英标",
    din: "德标",
    nema515r: "美标 NEMA 5-15R",
    nema520r: "美标 NEMA 5-20R",
    nemaL620r: "美标 NEMA L6-20R",
    nemaL530r: "美标 NEMA L5-30R",
    nemaL630r: "美标 NEMA L6-30R",
    outletDetails: "插座详细信息",
    shellMaterial: "外壳材料",
    color: "外壳颜色",
    inletlocation: "进线方式",
    connectionSpecification: "连线规格",
    junctionBox: "自接线盒",
    industrialConnector: "工业连接器",
    accessory: "安装附件",
    cableType: "线缆类型",
    cableLength: "线缆长度（米）",
    perphaseLight: "总指示灯",
    outletLight: "分位指示灯",
    meterDisplay: "普通表计计量显示",
    hotReplacement: "支持热更换",
    workTemperature: "工作环境温度(⁰C)",
    workHumidity: "工作相对湿度(%)",
    elevation: "工作海拔高度(m)",
    storageTemperature: "存储环境温度（⁰C）",
    storageHumidity: "存储相对湿度(%)",
    storageElevation: "存储海拔高度（m）",
    unitDimensions: "本体尺寸 (mm)",
    unitWeight: "本体重量 (kg)",
    pduMetering: "总计量",
    bank: "物理分区数（个）",
    outletMetering: "分位监测",
    outletSwitching: "分位控制",
    interface485: "485接口",
    interface232: "232接口",
    usbAInterface: "USB-A接口",
    usbBInterface: "USB-B接口",
    sensorInterface: "传感器接口",
    wireCommunication: "无线通讯",
    breakerMonitoring: "断路器监测",
    rcm: "漏电流RCM监测",
    neutralConductorMonitoring: "中线/零线电流检测",
    networkBandwidth: "网络通讯带宽",
    screenDisplay: "屏幕显示",
    selflock: "插座自锁防脱",
    spd: "SPD防雷浪涌保护",
    fuse: "保险管",
    perphaseBreaker: "总断路器",
    outletBreaker: "分位断路器",
    conformance: "认证",
    rohs: "RoHS",
    reach: "REACH",
    pep: "PEP",
    eoli: "EOLI",
    ec200666: "欧盟电池指令",
    proposition65Warning: "65号提案警告",
    otherEnvironmentalProtection: "其他环保要求",
    logo: "LOGO",
    shippingDimensions: "运输尺寸(mm)",
    shippingWeigh: "运输重量 (kg)",
    specialInstruction: "特殊说明",
    warranty: "质保保修",
    marketClassification: "市场推广"
};

let tmpDown;
let href = '';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    downloadExl = (json, type) => {
        let tmpdata = json[0];
        json.unshift({});
        let keyMap = []; //获取keys
        for (let k in tmpdata) {
            keyMap.push(k);
            json[0][k] = k;
        }
        //用来保存转换好的json
        let tmpData = [];
        json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
            v: v[k],
            position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpData[v.position] = {
            v: v.v
        });
        let outputPos = Object.keys(tmpData); //设置区域,比如表格从A1到D10
        let tmpWB = {
            SheetNames: ['TOP ELECTRIC PDUs'], //保存的表标题
            Sheets: {
                'TOP ELECTRIC PDUs': Object.assign({},
                    tmpData, //内容
                    {
                        '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                    })
            }
        };
        tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
            {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
        ))], {
            type: ""
        }); //创建二进制对象写入转换好的字节流
        href = URL.createObjectURL(tmpDown); //创建对象超链接
        setTimeout(function () { //延时释放
            URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);
    };

    s2ab = (s) => { //字符串转字符流
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    };
    // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    getCharCol = (n) => {
        let s = '', m = 0;
        while (n > 0) {
            m = n % 26 + 1;
            s = String.fromCharCode(m + 64) + s;
            n = (n - m) / 26
        }
        return s
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    hiddenDrawer = () => {
        this.setState({
            visible: false,
        });
    };

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        })
    };

    getFormItem = (data, formItemLayout, getFieldDecorator) => {
        let items = [];
        let index = 0;

        for (let key in data) {
            if (key === "id" || key === "gmtCreate" || key === "gmtModify")
                continue;
            items[index] = <Form.Item key={index} {...formItemLayout} label={zh[key] + ": "}>
                {
                    getFieldDecorator(key, {initialValue: data[key]})(
                        this.getTextArea(1)
                    )
                }
            </Form.Item>;
            index++;
        }

        return items;
    };

    getTextArea = (rows) => {
        return (
            <TextArea
                style={{color: "red", fontSize: 16}}
                rows={rows}
                disabled
            />
        );
    };

    makeExcelData = (data) => {
        let result = [];
        let obj = {};
        for (let key in data) {
            if (key === "id" || key === "gmtCreate" || key === "gmtModify")
                continue;
            obj[zh[key]] = data[key] ? data[key] : "暂无";
        }
        result.push(obj);
        return result;
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        const {getFieldDecorator} = this.props.form;
        const {data} = this.props;

        let obj = this.makeExcelData(data);
        let excelName = data['model'] + "_" + moment(new Date()).format('YYYY-MM-DD@HH-mm-ss') + ".xlsx";

        return (
            <div>
                <span onClick={this.showDrawer}>
                    <Icon type="profile"/> <b> 详情信息 </b>
                </span>
                <Drawer
                    title="产品详情参数信息"
                    width={800}
                    onClose={this.hiddenDrawer}
                    visible={this.state.visible}
                >
                    <Form
                        layout="vertical"
                        hideRequiredMark
                    >
                        {
                            this.getFormItem(data, formItemLayout, getFieldDecorator)
                        }
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            left: 10,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button
                            icon="close"
                            onClick={() => this.hiddenDrawer()}
                            style={{marginRight: 8}}
                        >
                            关闭
                        </Button>
                        <Button
                            icon="download"
                            onClick={this.downloadExl(obj)}
                            type="primary"
                        >
                            <a
                                style={{color: "white"}}
                                href={href}
                                download={excelName}
                            > 下载 </a>
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default Form.create()(ProductDetails);