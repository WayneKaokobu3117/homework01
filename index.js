var render = require('./lib/render'); 
var logger = require('koa-logger');
 
var route = require('koa-route'); 
var parse = require('co-body');

var koa = require('koa');
 
var app = koa(); 
var posts = [];

app.use(logger());

app.use(route.get('/', list));
app.use(route.get('/post/new', add)); 
app.use(route.get('/post/:id', show)); 
app.use(route.post('/post', create)); 

function *list() { 
 

  this.body = yield render('list', { posts: posts }); 

} 
function *add() { 

 this.body = yield render('new'); 

} 
function *show(id) { 

 
var post = posts[id]; 

 
if (!post) this.throw(404, 'invalid post id'); 

 
 this.body = yield render('show', { post: post }); 


} 

function *create() { 


  var post = yield parse(this); 

 
  var id = posts.push(post) - 1; 

 
  post.created_at = new Date; 

 
  post.id = id; 

 
  this.redirect('/'); 

} 
app.listen(3000); 


console.log('listening on port 3000'); 
