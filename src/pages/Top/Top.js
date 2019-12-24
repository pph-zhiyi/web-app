import React, {Component} from 'react';
import {Dropdown, Icon, Input, LocaleProvider, Menu, message as Message, Pagination, Table, Tooltip} from 'antd';
import {queryDataList, queryFilter} from '../../services/topService';
import zhCN from 'antd/es/locale-provider/zh_CN';
import ProductDetails from "./ProductDetails";

const {Search} = Input;

let params = {
    pageNo: 1,
    pageSize: 12
};

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            total: 0,
            filter: {}
        };
    }

    componentDidMount() {
        this.query(params);
        this.queryFilter();
    }

    modelChange = (v) => {
        params.model = v.target.value;
        console.log(params)
    };

    query = (value) => {
        this.setState({loading: true});
        queryDataList(value).then(res => {
            const {success, data, message} = res;
            if (success) {
                this.setState({
                    data: data.data,
                    total: data.total
                })
            } else {
                Message.error(message);
            }
            this.setState({loading: false});
        }).catch(err => {
            Message.error("请求异常！");
            this.setState({loading: false});
        });
    };

    queryFilter = () => {
        queryFilter().then(res => {
            const {success, data, message} = res;
            if (success) {
                this.setState({
                    filter: data
                })
            } else {
                Message.error(message);
            }
        }).catch(err => {
            Message.error("请求异常！");
        });
    };

    onPageChangeHandler = (pageNo, pageSize) => {
        params.pageNo = pageNo;
        params.pageSize = pageSize;
        this.query(params);
    };

    onShowSizeChange = (pageNo, pageSize) => {
        params.pageNo = pageNo;
        params.pageSize = pageSize;
        this.query(params);
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    fetch = (val = {}) => {
        params['function'] = val['function'];
        params['manufacturer'] = val['manufacturer'];
        this.setState({loading: true});
        this.query(params);
    };

    render() {
        const {data, total, loading, filter} = this.state;

        let subText = (text) => {
            let str = text;
            if (text && text.length > 15) {
                str = text.substring(0, 10).concat('...');
            }
            return (
                <Tooltip placement="top" title={text}>
                    <span className='blueBtn'> {str} </span>
                </Tooltip>
            );
        };

        const columns = [
            {
                title: "产品型号", dataIndex: "model", key: "model", width: 180, fixed: 'left',
                render: (text) => {
                    return subText(text);
                }
            },
            {title: "量产状态", dataIndex: "status", key: "status", width: 200},
            {
                title: "对标厂家",
                dataIndex: "manufacturer",
                key: "manufacturer",
                width: 200,
                filters: filter['manufacturer']
            },
            {
                title: "对标型号",
                dataIndex: "standardType",
                key: "standardType",
                width: 200
            },
            {
                title: "功能分类",
                dataIndex: "function",
                key: "function",
                width: 200,
                filters: filter['function']
            },
            {title: "安装形式", dataIndex: "formFactor", key: "formFactor", width: 200},
            {title: "AC/DC", dataIndex: "powerType", key: "powerType", width: 200},
            {
                title: "输入插头", dataIndex: "plug", key: "plug", width: 200,
                render: (text) => {
                    return subText(text);
                }
            },
            {title: "输入电压(V)", dataIndex: "inputVoltage", key: "inputVoltage", width: 200},
            {title: "可承受输入电压范围（V）", dataIndex: "acceptableInputVoltage", key: "acceptableInputVoltage", width: 200},
            {title: "电源频率（Hz）", dataIndex: "frequency", key: "frequency", width: 200},
            {title: "相位Phase", dataIndex: "phase", key: "phase", width: 200},
            {title: "最大输入电流(A)", dataIndex: "maximumInputCurrent", key: "maximumInputCurrent", width: 200},
            {title: "最大输入线电流（A）", dataIndex: "maximumLineCurrent", key: "maximumLineCurrent", width: 200},
            {title: "降额输入电流（A）", dataIndex: "deratedInputCurrent", key: "deratedInputCurrent", width: 200},
            {title: "功率(kVA)", dataIndex: "kva", key: "kva", width: 200},
            {
                title: "输出电压（V）", dataIndex: "outputVoltage", key: "outputVoltage", width: 200,
                render: (text) => {
                    return subText(text);
                }
            },
            {title: "最大汲取电流（A）", dataIndex: "maximumTotalCurrentDraw", key: "maximumTotalCurrentDraw", width: 200},
            {title: "插座数量", dataIndex: "outletNumber", key: "outletNumber", width: 200},
            {title: "C13", dataIndex: "c13", key: "c13", width: 200},
            {title: "C19", dataIndex: "c19", key: "c19", width: 200},
            {title: "万用孔", dataIndex: "universal", key: "universal", width: 200},
            {title: "国标10A", dataIndex: "gb10a", key: "gb10a", width: 200},
            {title: "国标16A", dataIndex: "gb16a", key: "gb16a", width: 200},
            {title: "国标小五孔", dataIndex: "gbSmallFive", key: "gbSmallFive", width: 200},
            {title: "英标", dataIndex: "bsEn", key: "bsEn", width: 200},
            {title: "德标", dataIndex: "din", key: "din", width: 200},
            {title: "美标 NEMA 5-15R ", dataIndex: "nema515r", key: "nema515r", width: 200},
            {title: "美标 NEMA 5-20R ", dataIndex: "nema520r", key: "nema520r", width: 200},
            {title: "美标 NEMA L6-20R ", dataIndex: "nemaL620r", key: "nemaL620r", width: 200},
            {title: "美标 NEMA L5-30R ", dataIndex: "nemaL530r", key: "nemaL530r", width: 200},
            {title: "美标 NEMA L6-30R ", dataIndex: "nemaL630r", key: "nemaL630r", width: 200},
            {
                title: "插座详细信息", dataIndex: "outletDetails", key: "outletDetails", width: 200,
                render: (text) => {
                    return subText(text);
                }
            },
            {title: "外壳材料", dataIndex: "shellMaterial", key: "shellMaterial", width: 200},
            {title: "外壳颜色", dataIndex: "color", key: "color", width: 200},
            {title: "进线方式", dataIndex: "inletlocation", key: "inletlocation", width: 200},
            {title: "连线规格", dataIndex: "connectionSpecification", key: "connectionSpecification", width: 200},
            {title: "自接线盒", dataIndex: "junctionBox", key: "junctionBox", width: 200},
            {title: "工业连接器", dataIndex: "industrialConnector", key: "industrialConnector", width: 200},
            {title: "安装附件", dataIndex: "accessory", key: "accessory", width: 200},
            {title: "线缆类型", dataIndex: "cableType", key: "cableType", width: 200},
            {title: "线缆长度（米）", dataIndex: "cableLength", key: "cableLength", width: 200},
            {title: "总指示灯", dataIndex: "perphaseLight", key: "perphaseLight", width: 200},
            {title: "分位指示灯", dataIndex: "outletLight", key: "outletLight", width: 200},
            {title: "普通表计计量显示", dataIndex: "meterDisplay", key: "meterDisplay", width: 200},
            {title: "支持热更换", dataIndex: "hotReplacement", key: "hotReplacement", width: 200},
            {title: "工作环境温度(⁰C)", dataIndex: "workTemperature", key: "workTemperature", width: 200},
            {title: "工作相对湿度(%)", dataIndex: "workHumidity", key: "workHumidity", width: 200},
            {title: "工作海拔高度(m)", dataIndex: "elevation", key: "elevation", width: 200},
            {title: "存储环境温度（⁰C）", dataIndex: "storageTemperature", key: "storageTemperature", width: 200},
            {title: "存储相对湿度(%)", dataIndex: "storageHumidity", key: "storageHumidity", width: 200},
            {title: "存储海拔高度（m）", dataIndex: "storageElevation", key: "storageElevation", width: 200},
            {
                title: "本体尺寸 (mm)", dataIndex: "unitDimensions", key: "unitDimensions", width: 200,
                render: (text) => {
                    return subText(text);
                }
            },
            {title: "本体重量 (kg)", dataIndex: "unitWeight", key: "unitWeight", width: 200},
            {title: "总计量", dataIndex: "pduMetering", key: "pduMetering", width: 200},
            {title: "物理分区数（个）", dataIndex: "bank", key: "bank", width: 200},
            {title: "分位监测", dataIndex: "outletMetering", key: "outletMetering", width: 200},
            {title: "分位控制", dataIndex: "outletSwitching", key: "outletSwitching", width: 200},
            {title: "485接口", dataIndex: "interface485", key: "interface485", width: 200},
            {title: "232接口", dataIndex: "interface232", key: "interface232", width: 200},
            {title: "USB-A接口", dataIndex: "usbAInterface", key: "usbAInterface", width: 200},
            {title: "USB-B接口", dataIndex: "usbBInterface", key: "usbBInterface", width: 200},
            {title: "传感器接口", dataIndex: "sensorInterface", key: "sensorInterface", width: 200},
            {title: "无线通讯", dataIndex: "wireCommunication", key: "wireCommunication", width: 200},
            {title: "断路器监测", dataIndex: "breakerMonitoring", key: "breakerMonitoring", width: 200},
            {title: "漏电流RCM监测", dataIndex: "rcm", key: "rcm", width: 200},
            {
                title: "中线/零线电流检测",
                dataIndex: "neutralConductorMonitoring",
                key: "neutralConductorMonitoring",
                width: 200
            },
            {title: "网络通讯带宽", dataIndex: "networkBandwidth", key: "networkBandwidth", width: 200},
            {title: "屏幕显示", dataIndex: "screenDisplay", key: "screenDisplay", width: 200},
            {title: "插座自锁防脱", dataIndex: "selflock", key: "selflock", width: 200},
            {title: "SPD防雷浪涌保护", dataIndex: "spd", key: "spd", width: 200},
            {title: "保险管", dataIndex: "fuse", key: "fuse", width: 200},
            {title: "总断路器", dataIndex: "perphaseBreaker", key: "perphaseBreaker", width: 200},
            {title: "分位断路器", dataIndex: "outletBreaker", key: "outletBreaker", width: 200},
            {title: "认证", dataIndex: "conformance", key: "conformance", width: 200},
            {title: "RoHS", dataIndex: "rohs", key: "rohs", width: 200},
            {title: "REACH", dataIndex: "reach", key: "reach", width: 200},
            {
                title: "PEP", dataIndex: "pep", key: "pep", width: 200,
                render: (text) => {
                    return subText(text);
                }
            },
            {
                title: "EOLI", dataIndex: "eoli", key: "eoli", width: 200,
                render: (text) => {
                    return subText(text);
                }
            },
            {title: "欧盟电池指令", dataIndex: "ec200666", key: "ec200666", width: 200},
            {
                title: "65号提案警告", dataIndex: "proposition65Warning", key: "proposition65Warning", width: 200,
                render: (text) => {
                    return subText(text);
                }
            },
            {
                title: "其他环保要求",
                dataIndex: "otherEnvironmentalProtection",
                key: "otherEnvironmentalProtection",
                width: 200
            },
            {title: "LOGO", dataIndex: "logo", key: "logo", width: 200},
            {title: "运输尺寸(mm)", dataIndex: "shippingDimensions", key: "shippingDimensions", width: 200},
            {title: "运输重量 (kg)", dataIndex: "shippingWeigh", key: "shippingWeigh", width: 200},
            {title: "特殊说明", dataIndex: "specialInstruction", key: "specialInstruction", width: 200},
            {title: "质保保修", dataIndex: "warranty", key: "warranty", width: 200},
            {title: "市场推广", dataIndex: "marketClassificatio", key: "marketClassificatio", width: 200},
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    const menu = (
                        <Menu>
                            <Menu.Item>
                                <span>
                                    <ProductDetails
                                        data={record}
                                    />
                                </span>
                            </Menu.Item>
                        </Menu>
                    );
                    return (
                        <Dropdown
                            overlay={menu}>
                            <span className='blueBtn'> 展开全部 <Icon type="down"/> </span>
                        </Dropdown>
                    );
                },
                width: 150,
                fixed: "right"
            }
        ];

        return (
            <div>
                <div>
                    <Search
                        style={{width: 300, marginTop: 5, marginBottom: 10}}
                        placeholder="请输入产品型号（全局模糊匹配）"
                        onSearch={value => this.query(params)}
                        onChange={value => this.modelChange(value)}
                        enterButton
                    />
                    <div>
                        <LocaleProvider locale={zhCN}>
                            <Table
                                loading={loading}
                                rowKey={record => record.model}
                                columns={columns}
                                dataSource={data}
                                pagination={false}
                                scroll={{x: 17000, y: 1000}}
                                onChange={this.handleTableChange}
                            />
                        </LocaleProvider>
                        <LocaleProvider locale={zhCN}>
                            <Pagination
                                className='ant-pagination ant-table-pagination'
                                total={total}
                                showTotal={total => `共 ${total} 项`}
                                current={params.pageNo}
                                pageSize={params.pageSize}
                                onChange={this.onPageChangeHandler}
                                onShowSizeChange={this.onShowSizeChange}
                                showSizeChanger
                                showQuickJumper
                            />
                        </LocaleProvider>
                    </div>
                </div>
            </div>
        );
    }
}

export default Top;