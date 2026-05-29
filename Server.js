import express from 'express';
const app = express();
app.use(express.json());
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
  if(req.method==='OPTIONS') return res.sendStatus(200);
  next();
});
app.post('/send-order',async(req,res)=>{
  const {message}=req.body;
  if(!message) return res.status(400).json({ok:false});
  const r=await fetch('https://api.telegram.org/bot8480110235:AAHX4c7ch5i_sRph34KQI9sLv-niwdsVnOM/sendMessage',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({chat_id:'6622390030',text:message})
  });
  const d=await r.json();
  res.json({ok:d.ok});
});
app.get('/',(req,res)=>res.send('OK'));
app.listen(process.env.PORT||3000);
