import React from 'react'

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
                            <img src="./assets/logo.png" class="poster-pic" alt=""/>
                                <a href="#"> Poster Name</a>
                    </div>
                            <div class="post-pic-container">
                                <img src="./assets/post.png" class="post-pic" alt=""/>
                    </div>
                                <div class="comment">
                                    <input type="text" name="comment_field" id="comment_field"/>
                    </div>
                                </div>

                                <div class="home-post">
                                    <div class="post-header">
                                        <img src="./assets/logo.png" class="poster-pic" alt=""/>
                                            <a href="#"> Poster Name</a>
                   </div>
                                        <div class="post-pic-container">
                                            <img src="./assets/post.png" class="post-pic" alt=""/>
                   </div>
                                            <div class="comment">
                                                <input type="text" name="comment_field" id="comment_field"/>
                   </div>
                                            </div>

                                            <div class="home-post">
                                                <div class="post-header">
                                                    <img src="./assets/logo.png" class="poster-pic" alt=""/>
                                                        <a href="#"> Poster Name</a>
                    </div>
                                                    <div class="post-pic-container">
                                                        <img src="./assets/post.png" class="post-pic" alt=""/>
                    </div>
                                                        <div class="comment">
                                                            <input type="text" name="comment_field" id="comment_field"/>
                    </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
    )
}

export default PageHomeScreen
