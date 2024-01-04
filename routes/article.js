var express = require('express');
var router = express.Router();
var moment = require('moment');


// 게시글 정보관리 라우팅 기능 제공
// DB참조
var Article = require('../schemas/article');
var Member = require('../schemas/member');


/*
-게시글 리스트 페이지 호출
호출 주소 : http://localhost:3001/article/list
GET
*/
router.get('/list',async(req,res)=>{
  try{
    var article = await Article.find({});
    var member = await Member.find({},{member_id:1, name:1});
  
  
    res.render('article/list', {article,member,moment});
  }catch(err){
    console.log(err);
    res.status(500).send('서버에러');
  }
});


/*
-게시글 생성 페이지 호출
호출 주소 : http://localhost:3001/article/create
GET
*/
router.get('/create',async(req,res)=>{
  res.render('article/create');
});


/*
-게시글 생성 페이지 정보 데이터 요청과 응답, 목록페이지 이동
호출 주소 : http://localhost:3001/article/create
POST
*/
router.post('/create',async(req,res)=>{
  try{

    // 요청 데이터 받기
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var article_type_code = req.body.article_type_code;
    var contents = req.body.contents;
    var is_display_code = req.body.is_display_code;
    var name = req.body.name;

    // 작성자 이름 값 받아서 작성자 계정 찾기
    var member = await Member.findOne({name:name},{member_id:1});

    reg_user_id = member.member_id;

    
    // 요청 데이터 DB 저장
    // ip주소 임시 데이터로 디폴트 값 지정됨
    var article = {
        board_type_code,
        title,
        article_type_code,
        contents,
        is_display_code,
        reg_user_id,
        reg_date:Date.now()
      }


      await Article.create(article);

  
    res.redirect('/article/list');


  }catch(err){
    console.log(err);
    res.status(500).send('서버 오류');
  }
});


/*
-게시글 수정 페이지 호출
호출 주소 : http://localhost:3001/article/modify
GET
*/
router.get('/modify/:artId',async(req,res)=>{

  // 파라미터 방식으로 요청 데이터 id 받기 
  var articleId = req.params.artId;
  
  var member = await Member.findOne({member_id:articleId},{name:1});

  // 수정 전 데이터 DB 에서 불러오기
  var article = await Article.findOne({article_id:articleId});


  res.render('article/modify', {article,member});
});


/*
-게시글 수정 페이지 게시글 데이터 수정 요청과 응답, 리스트 페이지 이동
호출 주소 : http://localhost:3001/article/modify
POST
*/
router.post('/modify/:artId',async(req,res)=>{
  try{

    // 요청 데이터 받기
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var article_type_code = req.body.article_type_code;
    var contents = req.body.contents;
    var is_display_code = req.body.is_display_code;
    var name = req.body.name;

    // 작성자 이름 값 받아서 작성자 계정 찾기
    var member = await Member.findOne({name:name},{member_id:1});

    reg_user_id = member.member_id;

    
    // 요청 데이터 DB 저장
    // ip주소 임시 데이터로 디폴트 값 지정됨
    var article = {
        board_type_code,
        title,
        article_type_code,
        contents,
        is_display_code,
        reg_user_id,
        reg_date:Date.now()
      }


      var updatedArticle = await Article.updateOne({reg_user_id},article);

    res.redirect('/article/list');

  }catch(err){
    console.log(err);
    res.status(500).send('서버 오류');
  }

});


/*
-게시글 삭제 페이지 요청과 응답
호출 주소 : http://localhost:3001/article/delete
GET
*/
router.get('/delete',async(req,res)=>{
  // 삭제할 데이터 id 요청 받기
  var artId = req.query.articleId;

  // 삭제할 데이터 id DB에서 찾은 후 삭제
  var deletedArticle = await Article.deleteOne({article_id:artId});

  res.redirect('/article/list');
});




module.exports = router;
