import React from 'react'

const Header = () => {
    return (
        <header className="header">
            <div className="header-col">
                <img src={require('../../assets/images/logo.png')} className="header-logo" alt="" />
                <div className="search-box">
                    <button className="search-btn">
                        <i className="fa fa-search"></i>
                    </button>
                    <input className="search-txt" type="text" name="" placeholder="Type to search" />
                </div>
            </div>
            <div className="header-col">
                <div className="header-list">
                    <div className="header-list-item">
                        <i className="fa fa-list-alt" />
                    </div>
                    <div className="header-list-item seperator"></div>
                    <div className="header-list-item">
                        <i className="fa fa-question-circle"></i>
                    </div>
                    <div className="header-list-item seperator"></div>
                    <div className="header-list-item">
                        <i className="fa fa-bell"></i>
                    </div>
                    <div className="header-list-item seperator"></div>
                    <div className="header-list-item dropdown">
                        <div className="dropdown-toggle">
                            username
                        </div>
                        <div className="dropdown-list">
                            <div className="dropdown-list-item">
                                <a href="#">profile</a>
                            </div>
                            <div className="dropdown-list-item">
                                <a href="#">saved posts</a>
                            </div>
                            <div className="dropdown-list-item">
                                <a href="#">block</a>
                            </div>
                            <div className="dropdown-list-item">
                                <a href="#">logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
