const express = require('express')
const app = new express()
app.use(express.static('public'))
const path = require('path');
app.get('/',(req,res)=>{ res.sendFile(path.resolve(__dirname,'pages/index.html'))
})
app.get('/about',(req,res)=>{ res.sendFile(path.resolve(__dirname,'pages/about.html'))
})
app.get('/contact',(req,res)=>{ res.sendFile(path.resolve(__dirname,'pages/contact.html'))
})
app.get('/post',(req,res)=>{ res.sendFile(path.resolve(__dirname,'pages/post.html'))
})

app.listen(3006, ()=>{
console.log('App listening on port 3006')
})

