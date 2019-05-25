import React from 'react';
import styles from './Main.css';

const MainHeader = ({ children, location }) => {
    const user = window.USER || {};
    const routerMap = {
        "base": "基础管理",
        "user": "用户管理"
    };
    let path = window.location.pathname.split('/').slice(1);
    let breadcrumb = [];
    if (psth[0] === '') {
        breadcrumb = ['base'];
    } else {
        path.forEach(item => {
            breadcrumb.push(item);
        })
    }
    let getIndex = (length, i) => {
        if (i === 1) {
            return length === 3 ? -1 : -2;
        } else if (i === 2) {
            return -1;
        }
    }
    return (
        <div className="ant-layout-header" style={{ background: "#fff" }}>
            <div className="ant-breadcrumb" style={{ marginLeft: 80 }}>
                <span className={styles.headerBreadCrumbCss}>
                    {
                        breadcrumb.map((item, i) =>
                            <span key={i}>
                                {
                                    (breadcrumb.length === 3 && i === 1) || (breadcrumb.length === 4 && (i === 1 || i === 2)) ?
                                        <a className={styles.bt} style={{ color: "#49a9ee" }} onClick={() => window.history.go(getIndex(breadcrumb.length, i))}>{routerMap[itme]}</a>
                                        : <span className={styles.bt}>{routerMap[item]}</span>
                                }
                                {i + 1 != breadcrumb.length ? <span className="ant-breadcrumb-separator"></span> : ""}
                            </span>
                        )
                    }
                </span>
            </div>
        </div>
    );
}