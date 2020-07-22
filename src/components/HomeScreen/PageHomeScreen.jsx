import React from 'react'
import PosterIMG from '../../assets/images/logo.png'
import PostIMG from '../../assets/images/post.png'

const PageHomeScreen = () => {
    return (
        <div class="home-container">

            <div class="home-left-container-item">
                <div class="home-student-container">
                    <div class="st-container">
                        <div class="st-name">
                            <p>SN</p>
                        </div>

                        <div class="st-content">
                            <p>Shehab Nagy</p>
                            <p>Student</p>
                            <p>Computer Science</p>
                        </div>
                    </div>
                    <button class="saved-posts-left">
                        saved posts
                </button>
                </div>
                <div class="home-recent-assignments-container">
                    <h3>Recent Assignments</h3>
                    <a href="#"> Assignment 1</a>
                    <a href="#">Assignment 2</a>
                    <a href="#">Assignment 3</a>
                    <a href="#">Assignment 4</a>
                    <a href="#">Assignment 5</a>
                </div>
            </div>

            <div class="home-right-container-item">
                <div class="home-courses-container">
                    <div class="home-course-item">
                        <div class="item-circle">
                            <div class="item-half-circle">
                                Lec
                        </div>
                            <div class="item-half-circle active">Sec</div>
                        </div>
                        <p class="item-title">Multimedia</p>
                    </div>
                    <div class="home-course-item">
                        <div class="item-circle">
                            <div class="item-half-circle">
                                Lec
                        </div>
                            <div class="item-half-circle">Sec</div>
                        </div>
                        <p class="item-title">Compiler</p>
                    </div>
                    <div class="home-course-item">
                        <div class="item-circle">
                            <div class="item-half-circle">
                                Lec
                        </div>
                            <div class="item-half-circle">Sec</div>
                        </div>
                        <p class="item-title">CV</p>
                    </div>
                    <div class="home-course-item">
                        <div class="item-circle">
                            <div class="item-half-circle">
                                Lec
                        </div>
                            <div class="item-half-circle">Sec</div>
                        </div>
                        <p class="item-title">ES</p>
                    </div>
                    <div class="home-course-item">
                        <div class="item-circle">
                            <div class="item-half-circle">
                                Lec
                        </div>
                            <div class="item-half-circle">Sec</div>
                        </div>
                        <p class="item-title">AI</p>
                    </div>
                    <div class="home-course-item">
                        <div class="item-circle">
                            <div class="item-half-circle">
                                Lec
                        </div>
                            <div class="item-half-circle">Sec</div>
                        </div>
                        <p class="item-title">Security</p>
                    </div>
                    <div class="home-course-item">
                        <div class="item-circle">
                            <div class="item-half-circle">
                                Lec
                        </div>
                            <div class="item-half-circle">Sec</div>
                        </div>
                        <p class="item-title">Graphics</p>
                    </div>
                    <div class="home-course-item">
                        <div class="item-circle">
                            <div class="item-half-circle">
                                Lec
                        </div>
                            <div class="item-half-circle">Sec</div>
                        </div>
                        <p class="item-title">VLSI</p>
                    </div>
                    <div class="home-course-item">
                        <div class="item-circle">
                            <div class="item-half-circle">
                                Lec
                        </div>
                            <div class="item-half-circle">Sec</div>
                        </div>
                        <p class="item-title">Project</p>
                    </div>
                </div>


                <div class="home-posts-container">

                    <div class="home-post">
                        <div class="post-header">
                            <img className="post-thumbnail" src={PosterIMG} />
                            <div className="post-content"><h2>Poster Name</h2> <span>3m</span></div>
                            <div className="post-menu">
                                <div className="dropdown">
                                    <div className="dropdown-toggle without">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </div>
                                    <div className="dropdown-list">
                                        <div className="dropdown-list-item">
                                            <button>Edit</button>
                                        </div>
                                        <div className="dropdown-list-item">
                                            <button>Delete</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="post-body">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quisquam magnam assumenda vel eligendi amet nemo dolore doloribus atque exercitationem beatae laudantium, magni neque mollitia quo blanditiis sed repudiandae voluptatum!</p>
                            <img src={PostIMG} />
                        </div>
                        <div className="post-comment-indicator">
                            <span>20 comment</span>
                        </div>
                        <div class="post-footer">
                            <button className="post-btn">
                                <i className="fa fa-comment"></i>
                                comment
                            </button>
                            <button className="post-btn">
                                <i className="fa fa-save"></i>
                                save
                            </button>
                            <button className="post-btn">
                                <i className="fa fa-download"></i>
                                download
                            </button>
                        </div>
                        <div class="comment-container">

                            <div className="comment-list">
                                <div className="comment-item">
                                    <div className="pic">st</div>
                                    <div className="content-container">
                                        <h3>saad tarek</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum molestias adipisci, porro odit </p>
                                        <span>3hrs</span>
                                    </div>
                                </div>
                                <div className="comment-item">
                                    <div className="pic">st</div>
                                    <div className="content-container">
                                        <h3>saad tarek</h3>
                                        <p>etur adipisicing elit. Voluptatum molestias adipisci, porro odit </p>
                                        <span>3hrs</span>
                                    </div>
                                </div>
                            </div>

                            <form class="comment-input-container">
                                <div className="pic">sh</div>
                                <textarea rows="2" className="input" placeholder="Enter your comment"></textarea>
                                <button className="btn"><i className="fa fa-paper-plane"></i></button>
                            </form >
                            <div className="comment-list"></div>

                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default PageHomeScreen
