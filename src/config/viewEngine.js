import express from "express";

let configViewEngine = (app) => {
    //arrow function
    // nên dùng let vì phạm vi trong blockscop, file hiện tại
    // var phạm vi global

    app.use(express.static("./src/public"));
    // Trong Node JS này ta đã sử dụng view engine có tên là ejs do đó
    // khi ta tạo file trong view ta fai đặt tên file là .ejs
    app.set("view engine", "ejs");
    // jsp <=> ejs : có thể sử dụng if , else , for
    // Cấu hình thư mục chứa view
    app.set("views", "./src/views");
}

module.exports = configViewEngine;
