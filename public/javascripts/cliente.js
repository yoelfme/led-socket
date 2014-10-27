function fnInicio()
{
  window.io = io.connect();

  io.on('connect', function(){
    console.log('client -> hi');
    io.emit('hi');
  });

  io.on('hi server', function( data){
    console.log('My ID is ->', data.socketId);
  });


  document.getElementById('btnApaga').addEventListener("click",function(){
    io.emit('apagar');
  },false);

  document.getElementById('btnEnciende').addEventListener("click",function(){
    io.emit('encender',{tiempo: document.getElementById('tiempo').value});
  },false);
}

addEventListener('load',fnInicio,false);
