
# Bài 3. Làm việc với MySql

Làm việc với MySql trong NodeJS là bài viết hướng dẫn kết nối, chèn/cập nhật/xóa dữ liệu và lấy dữ liệu… từ mysql vào trang web bằng NodeJS

Lưu ý, để thành thạo các thao tác dưới đây cần cân nhắc tìm hiểu về XAMPP trước khi bắt đầu vào học, xem thêm tại [đây](https://topdev.vn/blog/cai-dat-xampp/#:~:text=XAMPP%20l%C3%A0%20m%E1%BB%99t%20ph%E1%BA%A7n%20m%E1%BB%81m%20ngu%E1%BB%93n)


## Nội dung chính

## Cài đặt module mysql vào NodeJS
-------------------------------

Đây là thư viện giúp bạn làm việc với Mysql. Mở command prompt rồi chuyển vào folder project gõ lệnh:

```
npm install mysql
```


## Tạo kết nối tới server mysql
----------------------------

Để làm việc với Mysql, đầu tiên là tạo kết nối, trong trang js của mình, code như sau:

```js
//index.js
var mysql = require('mysql'); // nhúng module mysql vào trang
const db = mysql.createConnection ({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'bookstore'  //tên database muốn kết nối
});
```


## Tạo table trong mysql với nodeJS
--------------------------------

Khi làm việc với mysql, muốn tạo table chỉ việc viết câu lệnh sql tạo table rồi thực thi câu lệnh sql với hàm query của đối tượng kết nối. Ví dụ sau tạo một table tên book với 1 vài field :

```js
app.get("/tablecreate", (req, res) =>{
    var sql = `CREATE TABLE books (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255), 
            slug VARCHAR(255),
            price float, 
            description VARCHAR(4000),
            imageURL VARCHAR(255),
            showhide BOOLEAN,
            idCat INT(11)
        )`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.send("<h1>Đã tạo table</h1>");
    });
});
```


## Chèn dữ liệu vào mysql
----------------------

### Chèn dữ liệu vào mysql bằng cách chạy lệnh insert into

Bạn khai báo câu lệnh sql với các field và value như truyền thống rồi thực thi với hàm query của connection. Cụ thể như sau:

```js
app.get("/addbook", (req, res)=>{  //Cách 1
    let sql=`insert into books(title, price) values("Lĩnh Nam Chích Quái",350000)`;
    db.query( sql , function(err, data) {
        if (err) throw err;
        res.send(data); // data chứa số dòng chèn ...
    });
});
```


### Chèn một dòng vào mysql với dữ liệu là đối tượng json

Cách này rõ ràng và an toàn hơn, thực hiện hiện như sau:

```js
app.get("/bookadd", (req, res)=>{  //Cách 2
 let b = {title:'Ngự Dược Nhật Ký', price:'147000', slug:'ngu-duoc-nhat-ky'} 
 db.query("insert into books SET ? ", b , function(err, data) {
     if (err) throw err;
     res.send(data); 
    });    
});
```


### Thêm dữ liệu vào mysql từ form hoặc url

Dữ liệu có thể lấy từ form hoặc từ tham số của trang để chèn vào mysql. Sau đây là ví dụ lấy dữ liệu từ url chèn vào mysql. Bạn có thể thực hiện tương tự khi lấy dữ liệu từ form.

```js
app.get("/addbook2", (req, res)=>{         
    let ten = req.query['title'];
    let gia = req.query['price'];
    let slug = req.query['slug'];
    let b={title:ten, price:gia, slug:slug}     db.query('insert into books SET ?', b , function(err, data) {
       if (err) throw err;        
       res.redirect('/');
    }); 
})
```

```
http://localhost:3000/addbook2/?title=La Sơn Phu Tử&price=128000&slug=la-son-phu-tu
```

## Select dữ liệu từ mysql vào nodejs
----------------------------------

Lấy dữ liệu là thao tác thường làm nhất trong khi làm việc với mysql trong NodeJS. Việc này không khó gì cả, bạn chỉ việc viết câu lệnh sql và thực thi nó với hàm query như đã biết. Khi có dữ liệu, thường bạn sẽ nạp view và đưa dữ liệu cho view để nó hiển thị.

### Ví dụ lấy và hiện dữ liệu từ mysql

```js
app.get("/books",(req,res)=>{
  let sql = `SELECT * FROM books`;
  db.query(sql, function(err, data) { // data chứa kq truy vấn
     if (err) throw err;
     res.render('books',{listbooks:data}); //nạp view và truyền data
  });
});
```


**Hiển thị kết quả trong view:** bạn tạo file `views/books.ejs` để hiện dữ liệu lấy từ mysql. Dùng vòng lặp for để hiện kết quả nhé, các code html có thể dùng thêm các thư viện khác (như bootstrap) để có kết quả nhanh và đẹp

```js

<div class="container col-8">
<table class="table table-bordered">
    <% for (let book of listbooks ) { %>
    <tr>
        <td><%= book.id %> </td>
        <td><%= book.title %> </td>
        <td><%= book.price %> </td>
    </tr>
    <% } %>
  </table>
</div>
```

```
Test: http://localhost:3000/books
```

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section3/nodejs-books-1024x85.png?raw=true)

### Lấy dữ liệu từ mysql với điều kiện là tham số trong url/route

```js
 app.get("/book/:id",(req,res)=>{
    let id=req.params.id; //lấy giá trị tham số
    let id = parseInt(id,10); //ép kiểu thành số nguyên, dùng hệ số 10
    let sql = `SELECT * FROM books where id=${id}`;
    db.query(sql, function(err, data) { //data sẽ chứa dữ liệu
       if (err) throw err;
       console.log(data);
       res.render("book", {book:data}); //nạp view và truyền tham số
    });
 });
```


**Tạo view để hiện dữ liệu**: Bạn tạo file `views/book.ejs` và code:

```js
<div class="container col-8">
<table class="table table-bordered">
 <tr><th>Tên sách</th> <td><%=book[0].title%></td> </tr>
 <tr><th>Slug</th> <td><%=book[0].slug%></td> </tr>
 <tr><th>Giá</th><td><%=book[0].price.toLocaleString('vi')%></td> </tr>
 </table>
</div>
```

```
Test: http://localhost:3000/book/1 , http://localhost:3000/book/2
```

## Xoá dữ liệu
-----------

Bạn cũng chạy hàm query để thực thi câu lệnh Delete from quen thuộc thôi.

```js
app.get("/delBook/:id", (req, res)=>{    
    let id=req.params.id;
    db.query("DELETE FROM books WHERE id = ?", [id], function(err, data) {
       if (err) throw err;
       if (data.affectedRows==0) console.log(`Không có id book để xóa: ${id}`); 
       res.redirect('/books');
    }
)
});
```


## Sửa dữ liệu
-----------

Sửa dữ liệu cũng rất dễ dàng khi làm việc với mysql trong NodeJS, Bạn chạy hàm query để thực thi câu lệnh sql Update vẫn thường hay dùng. Sau đây coi sơ một mẫu hé.

```js
app.get("/updatelBook/", (req, res)=>{    
    let id = req.query.id;
    let t = req.query.title;
    let p = req.query.price;
    db.query(`UPDATE books SET title=?,price=? WHERE id = ?`,  [t, p, id], 
    function(err, data) {    
       if (err) throw err;
       if (data.affectedRows == 0) {
            console.log(`Không có id book để cập nhật: ${id}`);
       }       
       res.redirect('/books');
    })
});
```


Vậy là làm làm việc với MySql trong NodeJS dễ ợt phải không nào. Cần xem thêm tài liệu thì coi ở đây nhé

*   [https://www.w3schools.com/nodejs/nodejs\_mysql.asp](https://www.w3schools.com/nodejs/nodejs_mysql.asp)
*   [https://www.npmjs.com/package/mysql](https://www.npmjs.com/package/mysql)